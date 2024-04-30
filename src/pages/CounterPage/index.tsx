import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from "@/state/counter/counterSlice";
import { Button } from "@/components/ui/button";

const CounterPage = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <section className="CounterPage">
      <h1 className="text-2xl font-bold mb-4">Counter: {count}</h1>

      <div>
        <Button onClick={() => dispatch(decrement())} className="mr-3">
          -1
        </Button>
        <Button onClick={() => dispatch(increment())} className="mr-3">
          +1
        </Button>
        <Button onClick={() => dispatch(incrementByAmount(5))} className="mr-3">
          +5
        </Button>
        <Button onClick={() => dispatch(incrementAsync(10))} className="mr-3">
          +10 async (3 seconds)
        </Button>
      </div>
    </section>
  );
};

export default CounterPage;
