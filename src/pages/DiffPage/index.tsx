import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import { diffChars, diffLines, diffWords, Change } from "diff";

const DiffPage = () => {
  const initialLeftText = `const add = (a, b) => {
  return a + b;
}`;
  const initialRightText = `const addNumbers = (x, y) => {
  return x + y;
}`;
  const [leftText, setLeftText] = useState(initialLeftText);
  const [rightText, setRightText] = useState(initialRightText);
  const [diffResult, setDiffResult] = useState("");
  const [diffMethod, setDiffMethod] = useState("lines");
  const [ignoreCase, setIgnoreCase] = useState(false);

  const compareTexts = useCallback(() => {
    let diff;
    const options = { ignoreCase };

    const leftCompare = ignoreCase ? leftText.toLowerCase() : leftText;
    const rightCompare = ignoreCase ? rightText.toLowerCase() : rightText;

    switch (diffMethod) {
      case "chars":
        diff = diffChars(leftCompare, rightCompare, options);
        break;
      case "words":
        diff = diffWords(leftCompare, rightCompare, options);
        break;
      case "lines":
      default:
        diff = diffLines(leftCompare, rightCompare, options);
        break;
    }

    const formattedDiff = diff
      .map((part: Change) => {
        const color = part.added ? "green" : part.removed ? "red" : "grey";
        const backgroundColor = part.added
          ? "#e6ffed"
          : part.removed
          ? "#ffeef0"
          : "transparent";
        return `<span style="color: ${color}; background-color: ${backgroundColor};">${part.value}</span>`;
      })
      .join("");

    setDiffResult(formattedDiff);
  }, [leftText, rightText, diffMethod, ignoreCase]);

  useEffect(() => {
    compareTexts();
  }, [compareTexts]);

  return (
    <PageLayout>
      <PageTitle>Diff Page</PageTitle>
      <section className="flex space-x-4 mb-4">
        <div className="flex-1">
          <Textarea
            value={leftText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setLeftText(e.target.value)
            }
            className="h-80"
          />
        </div>
        <div className="flex-1">
          <Textarea
            value={rightText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setRightText(e.target.value)
            }
            className="h-80"
          />
        </div>
      </section>

      <section className="flex items-center justify-center space-x-4 mb-4">
        <RadioGroup
          value={diffMethod}
          onValueChange={setDiffMethod}
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ignoreCase"
            checked={ignoreCase}
            onCheckedChange={(checked) => setIgnoreCase(checked as boolean)}
          />
          <Label htmlFor="ignoreCase">Ignore Case</Label>
        </div>
      </section>

      {diffResult && (
        <div className="border p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Diff Result:</h2>
          <pre
            dangerouslySetInnerHTML={{ __html: diffResult }}
            className="whitespace-pre-wrap"
          />
        </div>
      )}
    </PageLayout>
  );
};

export default DiffPage;
