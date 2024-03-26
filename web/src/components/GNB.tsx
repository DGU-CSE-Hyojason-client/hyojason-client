import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export function GNB() {
  return (
    <ul className="flex gap-2 bg-slate-400 p-2">
      <LiMap
        links={[
          { to: "/", name: "home" },
          { to: "/chat", name: "chat" },
        ]}
      />
    </ul>
  );
}

function LiMap({ links }: { links: { to: string; name: string }[] }) {
  return (
    <>
      {links.map(({ to, name }) => {
        const border_color = to == location.pathname ? "#ffffff" : "#4e4e4e";
        const color = to == location.pathname ? "#4e4e4e" : "#ffffff";
        return (
          <li
            key={name}
            className="rounded-md"
            css={css`
              border: 1px solid ${border_color};
              color: ${color};
            `}
          >
            <Link className="py-1 px-2" to={to}>
              {name}
            </Link>
          </li>
        );
      })}
    </>
  );
}
