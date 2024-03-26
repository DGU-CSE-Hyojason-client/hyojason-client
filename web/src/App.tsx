import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { projectVersion } from "./utils/config";

function App() {
  return (
    <div className="flex flex-col h-screen content-between">
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
