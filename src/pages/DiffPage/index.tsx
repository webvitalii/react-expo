import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '@/components/PageLayout';
import { createTwoFilesPatch, diffChars, diffLines, diffWords, diffWordsWithSpace } from 'diff';
import { initialLeftText, initialRightText } from './examples';
import {
  CONTEXT_LINES,
  buildDiffRows,
  collapseRows,
  countChanges,
  type DiffMethod,
  type ViewItem,
  type ViewMode,
} from './diff-utils';
import { DiffControls } from './DiffControls';
import { InlineView } from './InlineView';
import { SplitView } from './SplitView';
import { PatchView } from './PatchView';

// Spec: ./spec/README.md
const DiffPage = () => {
  const { t } = useTranslation('diff');
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

  const expandBlock = (id: string) =>
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const copyPatch = async () => {
    try {
      await navigator.clipboard.writeText(patchText);
      setPatchCopied(true);
      setTimeout(() => setPatchCopied(false), 1500);
    } catch {
      // Clipboard access denied or unsupported — silently ignore.
    }
  };

  return (
    <PageLayout title={t('title', 'Diff Page')}>
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

      <DiffControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        diffMethod={diffMethod}
        setDiffMethod={setDiffMethod}
        ignoreCase={ignoreCase}
        setIgnoreCase={setIgnoreCase}
        ignoreWhitespace={ignoreWhitespace}
        setIgnoreWhitespace={setIgnoreWhitespace}
        wordWrap={wordWrap}
        setWordWrap={setWordWrap}
        collapseUnchanged={collapseUnchanged}
        setCollapseUnchanged={setCollapseUnchanged}
      />

      <div className="border rounded-md mt-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
          <h2 className="text-lg font-semibold">{t('result', 'Diff Result')}</h2>
          <div className="flex items-center gap-3 text-sm font-mono">
            <span className="text-green-700">+{added}</span>
            <span className="text-red-700">−{removed}</span>
            {viewMode === 'patch' && (
              <button
                type="button"
                onClick={copyPatch}
                className="ml-2 px-2 py-1 text-xs font-sans rounded border bg-background hover:bg-muted cursor-pointer"
              >
                {patchCopied ? t('copied', 'Copied!') : t('copy', 'Copy patch')}
              </button>
            )}
          </div>
        </div>
        {viewMode === 'inline' && <InlineView parts={inlineParts} wrapClass={wrapClass} />}
        {viewMode === 'split' && (
          <SplitView
            viewItems={viewItems}
            expandedBlocks={expandedBlocks}
            onExpand={expandBlock}
            wrapClass={wrapClass}
          />
        )}
        {viewMode === 'patch' && <PatchView patchText={patchText} wrapClass={wrapClass} />}
      </div>
    </PageLayout>
  );
};

export default DiffPage;
