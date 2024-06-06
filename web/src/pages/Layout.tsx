import { Outlet, useNavigate } from "react-router-dom";
import { GNB } from "../components/GNB";
import Header from "../components/Header";
import { useEffect } from "react";

export function Layout() {
  const history = useNavigate();

  useEffect(() => {
    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;

    const handleMessage = (event: any) => {
      const { route } = JSON.parse(event.data);
      history(route);
    };

    receiver.addEventListener("message", handleMessage);

    return () => {
      receiver.removeEventListener("message", handleMessage);
    };
  }, [history]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#FDF9F6]">
      <Header />
      <div className="flex grow overflow-hidden">
        <div className="h-full w-full overflow-auto">
          <Outlet />
        </div>
      </div>
      <GNB />
    </div>
  );
}
