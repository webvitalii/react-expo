import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import {
  createTwoFilesPatch,
  diffChars,
  diffLines,
  diffWords,
  diffWordsWithSpace,
  type Change,
} from 'diff';

const initialLeftText = `<section class="cart">
  <h2>Shopping cart</h2>
  <ul id="items"></ul>
  <p>Total: $0.00</p>
</section>

<script>
  var TAX_RATE = 0.07;

  function total(items) {
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].price != null) {
        sum = sum + items[i].price * items[i].qty;
      }
    }
    return sum + sum * TAX_RATE;
  }

  console.log('Total:', total(cart));
</script>`;

const initialRightText = `<section class="cart" aria-label="Shopping cart">
  <h2>Your cart</h2>
  <ul id="items"></ul>
  <p>Total: <span id="total">$0.00</span></p>
  <button type="button">Checkout</button>
</section>

<script>
  const TAX_RATE = 0.07;

  const total = (items) => {
    const subtotal = items
      .filter((item) => item.price != null)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
    return subtotal * (1 + TAX_RATE);
  };

  console.log('Total:', total(cart).toFixed(2));
</script>`;

type DiffRow =
  | { kind: 'common'; left: string; right: string; leftNo: number; rightNo: number }
  | { kind: 'removed'; left: string; leftNo: number }
  | { kind: 'added'; right: string; rightNo: number }
  | { kind: 'replaced'; left: string; right: string; leftNo: number; rightNo: number };

interface DiffSummary {
  rows: DiffRow[];
  added: number;
  removed: number;
}

// Split a diffLines part value into individual lines, dropping the trailing
// newline that diffLines appends to non-final parts.
const splitLines = (value: string): string[] => {
  const stripped = value.endsWith('\n') ? value.slice(0, -1) : value;
  return stripped.split('\n');
};

const buildDiffRows = (parts: Change[]): DiffSummary => {
  const rows: DiffRow[] = [];
  let leftNo = 1;
  let rightNo = 1;
  let added = 0;
  let removed = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const lines = splitLines(part.value);

    if (!part.added && !part.removed) {
      for (const line of lines) {
        rows.push({
          kind: 'common',
          left: line,
          right: line,
          leftNo: leftNo++,
          rightNo: rightNo++,
        });
      }
      continue;
    }

    if (part.removed && parts[i + 1]?.added) {
      const addedLines = splitLines(parts[i + 1].value);
      const pair = Math.min(lines.length, addedLines.length);
      for (let j = 0; j < pair; j++) {
        rows.push({
          kind: 'replaced',
          left: lines[j],
          right: addedLines[j],
          leftNo: leftNo++,
          rightNo: rightNo++,
        });
        removed++;
        added++;
      }
      for (let j = pair; j < lines.length; j++) {
        rows.push({ kind: 'removed', left: lines[j], leftNo: leftNo++ });
        removed++;
      }
      for (let j = pair; j < addedLines.length; j++) {
        rows.push({ kind: 'added', right: addedLines[j], rightNo: rightNo++ });
        added++;
      }
      i++;
      continue;
    }

    if (part.removed) {
      for (const line of lines) {
        rows.push({ kind: 'removed', left: line, leftNo: leftNo++ });
        removed++;
      }
    } else {
      for (const line of lines) {
        rows.push({ kind: 'added', right: line, rightNo: rightNo++ });
        added++;
      }
    }
  }

  return { rows, added, removed };
};

interface WordSpansProps {
  left: string;
  right: string;
  side: 'left' | 'right';
}

// Render a replaced line with intra-line word-level highlights so users can see
// exactly which tokens changed inside an otherwise-similar line.
const WordSpans = ({ left, right, side }: WordSpansProps) => {
  const parts = diffWordsWithSpace(left, right);
  return (
    <>
      {parts.map((part, i) => {
        if (side === 'left' && part.added) return null;
        if (side === 'right' && part.removed) return null;
        const highlight =
          side === 'left' && part.removed
            ? 'bg-red-500/25 text-red-900 dark:text-red-100'
            : side === 'right' && part.added
              ? 'bg-green-500/25 text-green-900 dark:text-green-100'
              : '';
        return (
          // oxlint-disable-next-line no-array-index-key
          <span key={i} className={highlight}>
            {part.value}
          </span>
        );
      })}
    </>
  );
};

const rowSideClasses = {
  common: 'text-muted-foreground',
  removed: 'bg-red-500/10 text-red-700 dark:text-red-300',
  added: 'bg-green-500/10 text-green-700 dark:text-green-300',
  replacedLeft: 'bg-red-500/10 text-red-700 dark:text-red-300',
  replacedRight: 'bg-green-500/10 text-green-700 dark:text-green-300',
  empty: 'bg-muted/30',
} as const;

const gutterClasses = 'select-none px-2 text-right text-xs text-muted-foreground tabular-nums';
const markerClasses = 'select-none px-1 text-center';

type ViewMode = 'inline' | 'split' | 'patch';
type DiffMethod = 'chars' | 'words' | 'lines';

const CONTEXT_LINES = 3;

type ViewItem = { kind: 'row'; row: DiffRow } | { kind: 'collapsed'; rows: DiffRow[]; id: string };

// Group consecutive 'common' rows that lie between changes (or at file start/end)
// into collapsible blocks, keeping `context` lines on each side as anchors.
const collapseRows = (rows: DiffRow[], context: number): ViewItem[] => {
  const items: ViewItem[] = [];
  let i = 0;
  while (i < rows.length) {
    if (rows[i].kind !== 'common') {
      items.push({ kind: 'row', row: rows[i] });
      i++;
      continue;
    }
    let j = i;
    while (j < rows.length && rows[j].kind === 'common') j++;
    const runLen = j - i;
    const keepStart = i === 0 ? 0 : context;
    const keepEnd = j === rows.length ? 0 : context;
    if (runLen <= keepStart + keepEnd + 1) {
      for (let k = i; k < j; k++) items.push({ kind: 'row', row: rows[k] });
    } else {
      for (let k = i; k < i + keepStart; k++) items.push({ kind: 'row', row: rows[k] });
      const hidden: DiffRow[] = [];
      for (let k = i + keepStart; k < j - keepEnd; k++) hidden.push(rows[k]);
      items.push({ kind: 'collapsed', rows: hidden, id: `hidden-${i}-${j}` });
      for (let k = j - keepEnd; k < j; k++) items.push({ kind: 'row', row: rows[k] });
    }
    i = j;
  }
  return items;
};

const countChanges = (parts: Change[]): { added: number; removed: number } => {
  let added = 0;
  let removed = 0;
  for (const part of parts) {
    if (part.added) added += part.count ?? 0;
    else if (part.removed) removed += part.count ?? 0;
  }
  return { added, removed };
};

const DiffPage = () => {
  const [leftText, setLeftText] = useState(initialLeftText);
  const [rightText, setRightText] = useState(initialRightText);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [diffMethod, setDiffMethod] = useState<DiffMethod>('lines');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [collapseUnchanged, setCollapseUnchanged] = useState(true);
  const [expandedBlocks, setExpandedBlocks] = useState<ReadonlySet<string>>(() => new Set());
  const [patchCopied, setPatchCopied] = useState(false);

  const copyPatch = async () => {
    try {
      await navigator.clipboard.writeText(patchText);
      setPatchCopied(true);
      setTimeout(() => setPatchCopied(false), 1500);
    } catch {
      // Clipboard access denied or unsupported — silently ignore.
    }
  };

  const expandBlock = (id: string) =>
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const normalizedLeft = ignoreCase ? leftText.toLowerCase() : leftText;
  const normalizedRight = ignoreCase ? rightText.toLowerCase() : rightText;

  const inlineParts = useMemo(() => {
    if (viewMode !== 'inline') return [];
    switch (diffMethod) {
      case 'chars':
        return diffChars(normalizedLeft, normalizedRight);
      case 'words':
        // diffWords already ignores whitespace; diffWordsWithSpace respects it.
        return ignoreWhitespace
          ? diffWords(normalizedLeft, normalizedRight)
          : diffWordsWithSpace(normalizedLeft, normalizedRight);
      case 'lines':
      default:
        return diffLines(normalizedLeft, normalizedRight, { ignoreWhitespace });
    }
  }, [viewMode, diffMethod, normalizedLeft, normalizedRight, ignoreWhitespace]);

  const splitDiff = useMemo(() => {
    if (viewMode !== 'split') return { rows: [], added: 0, removed: 0 };
    return buildDiffRows(diffLines(normalizedLeft, normalizedRight, { ignoreWhitespace }));
  }, [viewMode, normalizedLeft, normalizedRight, ignoreWhitespace]);

  const viewItems = useMemo<ViewItem[]>(() => {
    if (viewMode !== 'split') return [];
    if (!collapseUnchanged) return splitDiff.rows.map((row) => ({ kind: 'row', row }));
    return collapseRows(splitDiff.rows, CONTEXT_LINES);
  }, [viewMode, collapseUnchanged, splitDiff.rows]);

  const patchText = useMemo(() => {
    if (viewMode !== 'patch') return '';
    return createTwoFilesPatch('left', 'right', leftText, rightText, undefined, undefined, {
      ignoreWhitespace,
      context: CONTEXT_LINES,
    });
  }, [viewMode, leftText, rightText, ignoreWhitespace]);

  const stats = useMemo(() => {
    if (viewMode === 'split') return { added: splitDiff.added, removed: splitDiff.removed };
    if (viewMode === 'inline') return countChanges(inlineParts);
    return countChanges(diffLines(normalizedLeft, normalizedRight, { ignoreWhitespace }));
  }, [viewMode, splitDiff, inlineParts, normalizedLeft, normalizedRight, ignoreWhitespace]);

  const { added, removed } = stats;

  const wrapClass = wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto';

  const rowKey = (row: DiffRow): string => {
    const l = 'leftNo' in row ? row.leftNo : 'x';
    const r = 'rightNo' in row ? row.rightNo : 'x';
    return `${row.kind}-${l}-${r}`;
  };

  const NBSP = '\u00A0';
  const renderRow = (row: DiffRow, key: string) => {
    const leftNo = 'leftNo' in row ? row.leftNo : '';
    const rightNo = 'rightNo' in row ? row.rightNo : '';
    const leftMarker = row.kind === 'removed' || row.kind === 'replaced' ? '-' : ' ';
    const rightMarker = row.kind === 'added' || row.kind === 'replaced' ? '+' : ' ';

    const leftSideClass =
      row.kind === 'removed'
        ? rowSideClasses.removed
        : row.kind === 'replaced'
          ? rowSideClasses.replacedLeft
          : row.kind === 'added'
            ? rowSideClasses.empty
            : rowSideClasses.common;

    const rightSideClass =
      row.kind === 'added'
        ? rowSideClasses.added
        : row.kind === 'replaced'
          ? rowSideClasses.replacedRight
          : row.kind === 'removed'
            ? rowSideClasses.empty
            : rowSideClasses.common;

    const leftContent =
      row.kind === 'replaced' ? (
        <WordSpans left={row.left} right={row.right} side="left" />
      ) : row.kind === 'added' ? (
        NBSP
      ) : (
        row.left || NBSP
      );

    const rightContent =
      row.kind === 'replaced' ? (
        <WordSpans left={row.left} right={row.right} side="right" />
      ) : row.kind === 'removed' ? (
        NBSP
      ) : (
        row.right || NBSP
      );

    return (
      <div key={key} className="contents">
        <span className={`${gutterClasses} ${leftSideClass}`}>{leftNo}</span>
        <span className={`${markerClasses} ${leftSideClass}`}>{leftMarker}</span>
        <span className={`px-2 ${leftSideClass}`}>{leftContent}</span>
        <span className={`${gutterClasses} ${rightSideClass}`}>{rightNo}</span>
        <span className={`${markerClasses} ${rightSideClass}`}>{rightMarker}</span>
        <span className={`px-2 ${rightSideClass}`}>{rightContent}</span>
      </div>
    );
  };

  return (
    <PageLayout title="Diff Page">
      <section className="flex space-x-4 mb-4">
        <div className="flex-1">
          <Textarea
            value={leftText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLeftText(e.target.value)}
            className="h-150 font-mono"
          />
        </div>
        <div className="flex-1">
          <Textarea
            value={rightText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRightText(e.target.value)}
            className="h-150 font-mono"
          />
        </div>
      </section>

      <section className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 mb-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <RadioGroup
            value={viewMode}
            onValueChange={(v) => setViewMode(v as ViewMode)}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="split" id="view-split" />
              <Label htmlFor="view-split">Split</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inline" id="view-inline" />
              <Label htmlFor="view-inline">Inline</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="patch" id="view-patch" />
              <Label htmlFor="view-patch">Patch</Label>
            </div>
          </RadioGroup>

          {viewMode === 'inline' && (
            <RadioGroup
              value={diffMethod}
              onValueChange={(v) => setDiffMethod(v as DiffMethod)}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chars" id="chars" />
                <Label htmlFor="chars">Chars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="words" id="words" />
                <Label htmlFor="words">Words</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lines" id="lines" />
                <Label htmlFor="lines">Lines</Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {viewMode === 'split' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collapseUnchanged"
                checked={collapseUnchanged}
                onCheckedChange={(checked) => setCollapseUnchanged(Boolean(checked))}
              />
              <Label htmlFor="collapseUnchanged">Collapse Unchanged</Label>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wordWrap"
              checked={wordWrap}
              onCheckedChange={(checked) => setWordWrap(Boolean(checked))}
            />
            <Label htmlFor="wordWrap">Word Wrap</Label>
          </div>

          {!(viewMode === 'inline' && diffMethod === 'chars') && viewMode !== 'patch' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreWhitespace"
                checked={ignoreWhitespace}
                onCheckedChange={(checked) => setIgnoreWhitespace(Boolean(checked))}
              />
              <Label htmlFor="ignoreWhitespace">Ignore Whitespace</Label>
            </div>
          )}

          {viewMode === 'patch' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreWhitespace"
                checked={ignoreWhitespace}
                onCheckedChange={(checked) => setIgnoreWhitespace(Boolean(checked))}
              />
              <Label htmlFor="ignoreWhitespace">Ignore Whitespace</Label>
            </div>
          )}

          {viewMode !== 'patch' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreCase"
                checked={ignoreCase}
                onCheckedChange={(checked) => setIgnoreCase(Boolean(checked))}
              />
              <Label htmlFor="ignoreCase">Ignore Case</Label>
            </div>
          )}
        </div>
      </section>

      <div className="border rounded-md mt-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
          <h2 className="text-lg font-semibold">Diff Result</h2>
          <div className="flex items-center gap-3 text-sm font-mono">
            <span className="text-green-700">+{added}</span>
            <span className="text-red-700">−{removed}</span>
            {viewMode === 'patch' && (
              <button
                type="button"
                onClick={copyPatch}
                className="ml-2 px-2 py-1 text-xs font-sans rounded border bg-background hover:bg-muted cursor-pointer"
              >
                {patchCopied ? 'Copied!' : 'Copy patch'}
              </button>
            )}
          </div>
        </div>
        {viewMode === 'inline' && (
          <pre className={`p-4 font-mono text-sm ${wrapClass}`}>
            {inlineParts.map((part, i) => (
              // oxlint-disable-next-line no-array-index-key
              <span
                key={i}
                className={
                  part.added
                    ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                    : part.removed
                      ? 'bg-red-500/20 text-red-700 dark:text-red-300'
                      : 'text-muted-foreground'
                }
              >
                {part.value}
              </span>
            ))}
          </pre>
        )}

        {viewMode === 'split' && (
          <pre
            className={`grid font-mono text-sm ${wrapClass}`}
            style={{ gridTemplateColumns: 'auto auto 1fr auto auto 1fr' }}
          >
            {viewItems.flatMap((item) => {
              if (item.kind === 'row') return [renderRow(item.row, `r-${rowKey(item.row)}`)];
              if (expandedBlocks.has(item.id))
                return item.rows.map((r) => renderRow(r, `${item.id}-${rowKey(r)}`));
              return [
                <button
                  key={item.id}
                  type="button"
                  onClick={() => expandBlock(item.id)}
                  className="col-span-6 px-4 py-1 text-left text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border-y cursor-pointer"
                >
                  ▾ Show {item.rows.length} unchanged {item.rows.length === 1 ? 'line' : 'lines'}
                </button>,
              ];
            })}
          </pre>
        )}

        {viewMode === 'patch' && (
          <pre className={`p-4 font-mono text-xs ${wrapClass}`}>
            {patchText.split('\n').map((line, i) => {
              const cls =
                line.startsWith('+') && !line.startsWith('+++')
                  ? 'text-green-700 dark:text-green-300'
                  : line.startsWith('-') && !line.startsWith('---')
                    ? 'text-red-700 dark:text-red-300'
                    : line.startsWith('@@')
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-muted-foreground';
              return (
                // oxlint-disable-next-line no-array-index-key
                <div key={i} className={cls}>
                  {line || '\u00A0'}
                </div>
              );
            })}
          </pre>
        )}
      </div>
    </PageLayout>
  );
};

export default DiffPage;
