import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import { diffChars, diffLines, diffWords, diffWordsWithSpace, type Change } from 'diff';

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
            ? 'bg-red-200 text-red-900'
            : side === 'right' && part.added
              ? 'bg-green-200 text-green-900'
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
  removed: 'bg-red-50 text-red-900',
  added: 'bg-green-50 text-green-900',
  replacedLeft: 'bg-red-50 text-red-900',
  replacedRight: 'bg-green-50 text-green-900',
  empty: 'bg-muted/30',
} as const;

const gutterClasses = 'select-none px-2 text-right text-xs text-muted-foreground tabular-nums';
const markerClasses = 'select-none px-1 text-center';

type ViewMode = 'inline' | 'split';
type DiffMethod = 'chars' | 'words' | 'lines';

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
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

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

  const { added, removed } = viewMode === 'split' ? splitDiff : countChanges(inlineParts);
  const rows = splitDiff.rows;

  return (
    <PageLayout title="Diff Page">
      <section className="flex space-x-4 mb-4">
        <div className="flex-1">
          <Textarea
            value={leftText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLeftText(e.target.value)}
            className="h-80 font-mono"
          />
        </div>
        <div className="flex-1">
          <Textarea
            value={rightText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRightText(e.target.value)}
            className="h-80 font-mono"
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
          {!(viewMode === 'inline' && diffMethod === 'chars') && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreWhitespace"
                checked={ignoreWhitespace}
                onCheckedChange={(checked) => setIgnoreWhitespace(Boolean(checked))}
              />
              <Label htmlFor="ignoreWhitespace">Ignore Whitespace</Label>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="ignoreCase"
              checked={ignoreCase}
              onCheckedChange={(checked) => setIgnoreCase(Boolean(checked))}
            />
            <Label htmlFor="ignoreCase">Ignore Case</Label>
          </div>
        </div>
      </section>

      <div className="border rounded-md mt-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
          <h2 className="text-lg font-semibold">Diff Result</h2>
          <div className="flex items-center gap-3 text-sm font-mono">
            <span className="text-green-700">+{added}</span>
            <span className="text-red-700">−{removed}</span>
          </div>
        </div>
        {viewMode === 'inline' ? (
          <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
            {inlineParts.map((part, i) => (
              // oxlint-disable-next-line no-array-index-key
              <span
                key={i}
                className={
                  part.added
                    ? 'bg-green-100 text-green-800'
                    : part.removed
                      ? 'bg-red-100 text-red-800'
                      : 'text-muted-foreground'
                }
              >
                {part.value}
              </span>
            ))}
          </pre>
        ) : (
          <pre
            className="grid font-mono text-sm whitespace-pre-wrap"
            style={{ gridTemplateColumns: 'auto auto 1fr auto auto 1fr' }}
          >
            {rows.map((row, i) => {
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

              const NBSP = '\u00A0';
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
                // oxlint-disable-next-line no-array-index-key
                <div key={i} className="contents">
                  <span className={`${gutterClasses} ${leftSideClass}`}>{leftNo}</span>
                  <span className={`${markerClasses} ${leftSideClass}`}>{leftMarker}</span>
                  <span className={`px-2 ${leftSideClass}`}>{leftContent}</span>
                  <span className={`${gutterClasses} ${rightSideClass}`}>{rightNo}</span>
                  <span className={`${markerClasses} ${rightSideClass}`}>{rightMarker}</span>
                  <span className={`px-2 ${rightSideClass}`}>{rightContent}</span>
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
