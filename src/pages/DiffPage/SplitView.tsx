import { diffWordsWithSpace } from 'diff';
import { type DiffRow, type ViewItem, rowKey } from './diff-utils';

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

const NBSP = '\u00A0';

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

interface Props {
  viewItems: ViewItem[];
  expandedBlocks: ReadonlySet<string>;
  onExpand: (id: string) => void;
  wrapClass: string;
}

export function SplitView({ viewItems, expandedBlocks, onExpand, wrapClass }: Props) {
  return (
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
            onClick={() => onExpand(item.id)}
            className="col-span-6 px-4 py-1 text-left text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border-y cursor-pointer"
          >
            ▾ Show {item.rows.length} unchanged {item.rows.length === 1 ? 'line' : 'lines'}
          </button>,
        ];
      })}
    </pre>
  );
}
