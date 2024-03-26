import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ChatPage } from "./pages/ChatPage";
import { Layout } from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/chat",
    element: <Layout />,
    children: [{ index: true, element: <ChatPage /> }],
  },
]);

export { router };
