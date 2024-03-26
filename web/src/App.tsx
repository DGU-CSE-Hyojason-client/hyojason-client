import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";

function App() {
  return (
    <div className="bg-slate-300">
      <header>zz</header>
      <main>
        <RouterProvider router={router} />
      </main>
      <footer>foot</footer>
    </div>
  );
}

export default App;
