import React, { useState } from "react";
import CounterButton from "./CounterButton";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = useState(0);

  const incrementCounterParentAction = (by) => {
    setCount(count + by);
  };
  const decrementCounterParentAction = (by) => {
    setCount(count - by);
  };
  const resetCounter = () => {
    setCount(0);
  };
  return (
    <>
      <span className="totalCount">{count}</span>
      <CounterButton
        by={1}
        incrementMethod={incrementCounterParentAction}
        decrementMethod={decrementCounterParentAction}
      />
      <CounterButton
        by={2}
        incrementMethod={incrementCounterParentAction}
        decrementMethod={decrementCounterParentAction}
      />
      <CounterButton
        by={5}
        incrementMethod={incrementCounterParentAction}
        decrementMethod={decrementCounterParentAction}
      />
      <button className="resetButton button" onClick={resetCounter}>
        Reset
      </button>
    </>
  );
}
