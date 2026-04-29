import { type Change } from 'diff';

interface Props {
  parts: Change[];
  wrapClass: string;
}

export function InlineView({ parts, wrapClass }: Props) {
  return (
    <pre className={`p-4 font-mono text-sm ${wrapClass}`}>
      {parts.map((part, i) => (
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
  );
}
