import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";

function App() {
  return (
    <div className="flex flex-col h-screen content-between">
      <main className="grow">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
