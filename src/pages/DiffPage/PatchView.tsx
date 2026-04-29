interface Props {
  patchText: string;
  wrapClass: string;
}

export function PatchView({ patchText, wrapClass }: Props) {
  return (
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
  );
}
