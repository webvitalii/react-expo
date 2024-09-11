import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { diffLines, Change } from "diff";

const DiffPage = () => {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffResult, setDiffResult] = useState("");

  const compareTexts = () => {
    const diff = diffLines(leftText, rightText);
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
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-4">
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
      </div>
      <Button onClick={compareTexts} className="mb-4">
        Compare
      </Button>
      {diffResult && (
        <div className="border p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Diff Result:</h2>
          <pre
            dangerouslySetInnerHTML={{ __html: diffResult }}
            className="whitespace-pre-wrap"
          />
        </div>
      )}
    </div>
  );
};

export default DiffPage;
