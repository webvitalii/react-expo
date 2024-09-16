import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";

const TestPage = () => {
  const [message, setMessage] = useState<string>("");

  const handleNewMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  return (
    <PageLayout>
      <PageTitle>TestPage</PageTitle>

      <h3>{message}</h3>
      <Child handleNewMessage={handleNewMessage} />
    </PageLayout>
  );
};

interface ChildProps {
  handleNewMessage: (newMessage: string) => void;
}

const Child: React.FC<ChildProps> = (props: ChildProps) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const [count, setCount] = useState(0);

  function handleCounterClick() {
    setCount(count + 1);
  }

  const handleNewMessage = () => {
    props.handleNewMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <Input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      <Button onClick={handleNewMessage}>Change Message</Button>

      <div>
        <CounterButtonSharedState count={count} onClick={handleCounterClick} />
        <CounterButtonSharedState count={count} onClick={handleCounterClick} />
        <CounterButton />
        <CounterButton />
      </div>
    </div>
  );
};

const CounterButtonSharedState = (props: {
  count: number;
  onClick: () => void;
}) => {
  return (
    <Button onClick={props.onClick}>
      Clicked {props.count} times (connected)
    </Button>
  );
};

const CounterButton = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <Button onClick={handleClick}>Clicked {count} times</Button>;
};

export default TestPage;
