import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ChatPage } from "./pages/ChatPage";
import { Layout } from "./pages/Layout";
import { MatchingPage } from "./pages/MatchingPage";
import { AccountWrapper } from "./AccountWrapper";

const router = createBrowserRouter([
  {
    // 인증필요
    path: "/",
    element: (
      <AccountWrapper>
        <Layout />
      </AccountWrapper>
    ),
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
    ],
  },
]);

export { router };
