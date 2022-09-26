import type { Component, JSX, JSXElement } from "solid-js";
import Advice from "./components/Advice";

import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Advice />
    </div>
  );
};

export default App;
