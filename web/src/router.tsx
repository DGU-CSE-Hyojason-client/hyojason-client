import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ChatPage } from "./pages/ChatPage";
import { Layout } from "./pages/Layout";
import { MatchingPage } from "./pages/MatchingPage";
import ConfigPage from "./pages/ConfigPage.tsx";

const router = createBrowserRouter([
  {
    // 인증필요
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/matching",
        element: <MatchingPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/config",
        element: <ConfigPage />,
      },
    ],
  },
]);

export { router };
