import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";

import styles from "./Advice.module.css";

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
  const [adviceId, setAdviceId] = createSignal(0);
  const [screenWidth, setScreenWidth] = createSignal(screen.width);

  const diceIcon = (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        fill="#202733"
      />
    </svg>
  );

  const desktopDivider = (
    <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
        <g transform="translate(212)" fill="#CEE3E9">
          <rect width="6" height="16" rx="3" />
          <rect x="14" width="6" height="16" rx="3" />
        </g>
      </g>
    </svg>
  );

  const mobileDivider = (
    <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
        <g transform="translate(138)" fill="#CEE3E9">
          <rect width="6" height="16" rx="3" />
          <rect x="14" width="6" height="16" rx="3" />
        </g>
      </g>
    </svg>
  );

  function newAdvice() {
    fetchAdvice()
      .then((advice) => {
        const result = advice.slip;
        setAdvice(result.advice);
        setAdviceId(result.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div class={styles.adviceCard}>
      <Show
        when={advice() !== "" || adviceId() !== 0}
        fallback={
          <>
            <div class={styles.adviceId}>ADVICE #0</div>
            <h1>Press the button to generate new advice</h1>
          </>
        }
      >
        <div class={styles.adviceId}>ADVICE #{adviceId()}</div>
        <h1>"{advice}"</h1>
      </Show>
      {mobileDivider}
      <button class={styles.button} onClick={newAdvice}>
        {diceIcon}
      </button>
    </div>
  );
};
export default Advice;
