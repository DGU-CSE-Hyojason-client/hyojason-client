import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import initMock from "./_mocks";
import { ChakraProvider } from "@chakra-ui/react";

(async () => {
  if (process.env.NODE_ENV === "development") {
    await initMock();
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ChakraProvider disableGlobalStyle>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
})();
