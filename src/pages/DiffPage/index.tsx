import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import { diffChars, diffLines, diffWords } from 'diff';

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

type DiffMethod = 'chars' | 'words' | 'lines';

const DiffPage = () => {
  const [leftText, setLeftText] = useState(initialLeftText);
  const [rightText, setRightText] = useState(initialRightText);
  const [diffMethod, setDiffMethod] = useState<DiffMethod>('lines');
  const [ignoreCase, setIgnoreCase] = useState(false);

  const diffParts = useMemo(() => {
    const left = ignoreCase ? leftText.toLowerCase() : leftText;
    const right = ignoreCase ? rightText.toLowerCase() : rightText;

    switch (diffMethod) {
      case 'chars':
        return diffChars(left, right);
      case 'words':
        return diffWords(left, right);
      case 'lines':
      default:
        return diffLines(left, right);
    }
  }, [leftText, rightText, diffMethod, ignoreCase]);

  return (
    <PageLayout title="Diff Page">
      <section className="flex space-x-4 mb-4">
        <div className="flex-1">
          <Textarea
            value={leftText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLeftText(e.target.value)}
            className="h-80"
          />
        </div>
        <div className="flex-1">
          <Textarea
            value={rightText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRightText(e.target.value)}
            className="h-80"
          />
        </div>
      </section>

      <section className="flex items-center justify-center space-x-4 mb-4">
        <RadioGroup value={diffMethod} onValueChange={setDiffMethod} className="flex space-x-2">
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
            onCheckedChange={(checked) => setIgnoreCase(checked)}
          />
          <Label htmlFor="ignoreCase">Ignore Case</Label>
        </div>
      </section>

      <div className="border p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Diff Result:</h2>
        <pre className="whitespace-pre-wrap">
          {diffParts.map((part, i) => (
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
      </div>
    </PageLayout>
  );
};

export default DiffPage;
