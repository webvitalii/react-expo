import { type Change } from 'diff';

export type ViewMode = 'inline' | 'split' | 'patch';
export type DiffMethod = 'chars' | 'words' | 'lines';

export type DiffRow =
  | { kind: 'common'; left: string; right: string; leftNo: number; rightNo: number }
  | { kind: 'removed'; left: string; leftNo: number }
  | { kind: 'added'; right: string; rightNo: number }
  | { kind: 'replaced'; left: string; right: string; leftNo: number; rightNo: number };

export interface DiffSummary {
  rows: DiffRow[];
  added: number;
  removed: number;
}

export type ViewItem =
  | { kind: 'row'; row: DiffRow }
  | { kind: 'collapsed'; rows: DiffRow[]; id: string };

export const CONTEXT_LINES = 3;

// Split a diffLines part value into individual lines, dropping the trailing
// newline that diffLines appends to non-final parts.
export const splitLines = (value: string): string[] => {
  const stripped = value.endsWith('\n') ? value.slice(0, -1) : value;
  return stripped.split('\n');
};

export const buildDiffRows = (parts: Change[]): DiffSummary => {
  const rows: DiffRow[] = [];
  let leftNo = 1;
  let rightNo = 1;
  let added = 0;
  let removed = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
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
      const addedLines = splitLines(parts[i + 1]!.value);
      const pair = Math.min(lines.length, addedLines.length);
      for (let j = 0; j < pair; j++) {
        rows.push({
          kind: 'replaced',
          left: lines[j]!,
          right: addedLines[j]!,
          leftNo: leftNo++,
          rightNo: rightNo++,
        });
        removed++;
        added++;
      }
      for (let j = pair; j < lines.length; j++) {
        rows.push({ kind: 'removed', left: lines[j]!, leftNo: leftNo++ });
        removed++;
      }
      for (let j = pair; j < addedLines.length; j++) {
        rows.push({ kind: 'added', right: addedLines[j]!, rightNo: rightNo++ });
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

// Group consecutive 'common' rows that lie between changes (or at file start/end)
// into collapsible blocks, keeping `context` lines on each side as anchors.
export const collapseRows = (rows: DiffRow[], context: number): ViewItem[] => {
  const items: ViewItem[] = [];
  let i = 0;
  while (i < rows.length) {
    if (rows[i]!.kind !== 'common') {
      items.push({ kind: 'row', row: rows[i]! });
      i++;
      continue;
    }
    let j = i;
    while (j < rows.length && rows[j]!.kind === 'common') j++;
    const runLen = j - i;
    const keepStart = i === 0 ? 0 : context;
    const keepEnd = j === rows.length ? 0 : context;
    if (runLen <= keepStart + keepEnd + 1) {
      for (let k = i; k < j; k++) items.push({ kind: 'row', row: rows[k]! });
    } else {
      for (let k = i; k < i + keepStart; k++) items.push({ kind: 'row', row: rows[k]! });
      const hidden: DiffRow[] = [];
      for (let k = i + keepStart; k < j - keepEnd; k++) hidden.push(rows[k]!);
      items.push({ kind: 'collapsed', rows: hidden, id: `hidden-${i}-${j}` });
      for (let k = j - keepEnd; k < j; k++) items.push({ kind: 'row', row: rows[k]! });
    }
    i = j;
  }
  return items;
};

export const countChanges = (parts: Change[]): { added: number; removed: number } => {
  let added = 0;
  let removed = 0;
  for (const part of parts) {
    if (part.added) added += part.count ?? 0;
    else if (part.removed) removed += part.count ?? 0;
  }
  return { added, removed };
};

export const rowKey = (row: DiffRow): string => {
  const l = 'leftNo' in row ? row.leftNo : 'x';
  const r = 'rightNo' in row ? row.rightNo : 'x';
  return `${row.kind}-${l}-${r}`;
};
