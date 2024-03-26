import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { projectVersion } from "./utils/config";

function App() {
  return (
    <div className="flex flex-col h-screen content-between">
      <header className="h-8 bg-slate-400">헤더 개발필요..</header>
      <main className="grow">
        <RouterProvider router={router} />
      </main>
      <footer className="text-center text-xs">
        hyojason-client version: {projectVersion}
      </footer>
    </div>
  );
}

export default App;
