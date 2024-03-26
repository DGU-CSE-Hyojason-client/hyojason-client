import { Outlet } from "react-router-dom";
import { GNB } from "../components/GNB";

export function Layout() {
  return (
    <div>
      <GNB />
      <Outlet />
    </div>
  );
}
