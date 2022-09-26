import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";

interface AdviceData {
  slip: {
    advice: string;
    id: number;
  };
}

const fetchAdvice = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  const advice: AdviceData = await response.json();
  return advice;
};

const Advice: Component = () => {
  const [advice, setAdvice] = createSignal("");

  function newAdvice() {
    fetchAdvice()
      .then((advice) => {
        const result = advice.slip.advice;
        setAdvice(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <button onClick={newAdvice}>Generate Advice</button>
      <Show
        when={advice() !== ""}
        fallback={<h1>Press the button to generate new advice</h1>}
      >
        <h1>{advice}</h1>
      </Show>
    </>
  );
};
export default Advice;
