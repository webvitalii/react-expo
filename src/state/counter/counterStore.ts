import { Store } from "@tanstack/react-store";

interface CounterState {
  value: number;
}

export const counterStore = new Store<CounterState>({
  value: 0,
});

export const decrement = () => {
  counterStore.setState((state) => ({
    ...state,
    value: state.value - 1,
  }));
};

export const increment = () => {
  counterStore.setState((state) => ({
    ...state,
    value: state.value + 1,
  }));
};

export const incrementByAmount = (amount: number) => {
  counterStore.setState((state) => ({
    ...state,
    value: state.value + amount,
  }));
};

export const incrementAsync = async (amount: number) => {
  console.log("incrementAsync.pending");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("incrementAsync.fulfilled");
  counterStore.setState((state) => ({
    ...state,
    value: state.value + amount,
  }));
};
