import { useStore } from '@tanstack/react-store';
import { counterStore } from '@/state/store';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from '@/state/counter/counterStore';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';

const CounterPage = () => {
  const count = useStore(counterStore, (state) => state.value);

  return (
    <PageLayout>
      <PageTitle>Counter: {count}</PageTitle>

      <div>
        <Button onClick={() => decrement()} className="mr-3">
          -1
        </Button>
        <Button onClick={() => increment()} className="mr-3">
          +1
        </Button>
        <Button onClick={() => incrementByAmount(5)} className="mr-3">
          +5
        </Button>
        <Button onClick={() => incrementAsync(10)} className="mr-3">
          +10 async (3 seconds)
        </Button>
      </div>
    </PageLayout>
  );
};

export default CounterPage;
