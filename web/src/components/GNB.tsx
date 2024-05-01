import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeIcon from "../assets/icons/home.svg?react";
import ChatIcon from "../assets/icons/chat.svg?react";
import GroupIcon from "../assets/icons/group.svg?react";

const route = [
  { name: "홈", path: "/", Icon: HomeIcon },
  { name: "매칭", path: "/matching", Icon: GroupIcon },
  { name: "채팅", path: "/chat", Icon: ChatIcon },
];

export function GNB() {
  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(location.pathname);
  }, [tab]);

  function setTabFromLocation(tab: string) {
    setTab(tab);
  }

  const items =
    route.length > 5
      ? route
      : // @ts-expect-error ts-ignore
        route.concat(Array.from({ length: 5 - route.length }).fill(route[0]));

  return (
    <ul className="flex justify-between rounded-t-lg bg-slate-800 px-4 py-2 hidden">
      {items
        .map(({ path, name, Icon }) => ({ to: path, name, Icon }))
        .map(({ to, name, Icon }, i) => {
          const color = to == tab ? "#ffffff" : "#909090";
          return (
            <li
              key={`${name}-${i}`}
              className="rounded-md justify-between"
              css={css`
                color: ${color};
              `}
              onClick={() => setTabFromLocation(location.pathname)}
            >
              <Link className="flex flex-col gap-1 items-center" to={to}>
                <Icon className="w-5 h-5" style={{ color }} />
                <span className="text-xs">{name}</span>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
