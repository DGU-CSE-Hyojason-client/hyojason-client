import { Outlet } from "react-router-dom";
// import { GNB } from "../components/GNB";
import Header from "../components/Header";
export function Layout() {
  return (
    <div className="flex flex-col w-full h-screen bg-slate-900 text-white">
      <Header />
      <div className="flex grow overflow-hidden">
        <div className="h-full w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
