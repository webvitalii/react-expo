import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type DiffMethod, type ViewMode } from './diff-utils';

interface Props {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  diffMethod: DiffMethod;
  setDiffMethod: (v: DiffMethod) => void;
  ignoreCase: boolean;
  setIgnoreCase: (v: boolean) => void;
  ignoreWhitespace: boolean;
  setIgnoreWhitespace: (v: boolean) => void;
  wordWrap: boolean;
  setWordWrap: (v: boolean) => void;
  collapseUnchanged: boolean;
  setCollapseUnchanged: (v: boolean) => void;
}

export function DiffControls({
  viewMode,
  setViewMode,
  diffMethod,
  setDiffMethod,
  ignoreCase,
  setIgnoreCase,
  ignoreWhitespace,
  setIgnoreWhitespace,
  wordWrap,
  setWordWrap,
  collapseUnchanged,
  setCollapseUnchanged,
}: Props) {
  const showIgnoreWhitespace = !(viewMode === 'inline' && diffMethod === 'chars');
  const showIgnoreCase = viewMode !== 'patch';

  return (
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

        {showIgnoreWhitespace && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ignoreWhitespace"
              checked={ignoreWhitespace}
              onCheckedChange={(checked) => setIgnoreWhitespace(Boolean(checked))}
            />
            <Label htmlFor="ignoreWhitespace">Ignore Whitespace</Label>
          </div>
        )}

        {showIgnoreCase && (
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
  );
}
