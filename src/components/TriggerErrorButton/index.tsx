import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TriggerErrorButtonProps {
  label?: string;
  message?: string;
}

/**
 * Dev helper that throws a render-time error on click so an ancestor
 * ErrorBoundary can intercept it.
 *
 * React error boundaries only catch errors thrown during render (or in
 * descendants' lifecycle methods). Throwing directly inside an onClick
 * handler would NOT be caught — it would surface as an unhandled error.
 * So the button sets state and the throw happens on the next render.
 */
const TriggerErrorButton = ({
  label = 'Trigger error',
  message = 'Simulated render error.',
}: TriggerErrorButtonProps) => {
  const [explode, setExplode] = useState(false);

  if (explode) {
    throw new Error(message);
  }

  return (
    <Button variant="destructive" onClick={() => setExplode(true)}>
      {label}
    </Button>
  );
};

export default TriggerErrorButton;
