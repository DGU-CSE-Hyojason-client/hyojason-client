import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { route } from "../router";
import { useEffect, useState } from "react";

export function GNB() {
  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(location.pathname);
  }, [tab]);

  function setTabFromLocation(tab: string) {
    setTab(tab);
  }

  return (
    <ul className="flex gap-2 bg-slate-400 p-2">
      {route
        .map(({ path, name }) => ({ to: path, name }))
        .map(({ to, name }) => {
          const border_color = to == tab ? "#ffffff" : "#4e4e4e";
          const color = to == tab ? "#080808" : "#ffffff";
          return (
            <li
              key={name}
              className="rounded-md"
              css={css`
                border: 1px solid ${border_color};
                color: ${color};
              `}
              onClick={() => setTabFromLocation(location.pathname)}
            >
              <Link className="py-1 px-2" to={to}>
                {name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
