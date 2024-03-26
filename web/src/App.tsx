import { css } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";

function App() {
  return (
    <div
      css={css`
        color: black;
      `}
    >
      <header>zz</header>
      <main>
        <RouterProvider router={router} />
      </main>
      <footer>foot</footer>
    </div>
  );
}

export default App;
