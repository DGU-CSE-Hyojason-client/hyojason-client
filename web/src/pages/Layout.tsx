import { Outlet, useNavigate } from "react-router-dom";
import { GNB } from "../components/GNB";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export function Layout() {
  const [msg, setMsg] = useState<string>("");
  const history = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { route } = event.data;
      setMsg(event.data);
      history(route);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [history]);

  return (
    <div className="flex flex-col w-full h-screen bg-slate-900 text-white">
      <Header />
      <div>{msg}</div>
      <div onClick={() => history("/chat")}>to chat</div>
      <div className="flex grow overflow-hidden">
        <div className="h-full w-full overflow-auto">
          <Outlet />
        </div>
      </div>
      <GNB />
    </div>
  );
}
