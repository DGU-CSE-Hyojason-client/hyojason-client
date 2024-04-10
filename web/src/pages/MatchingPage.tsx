import { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import MatchResult from "./matching/elder/MatchResult";
import { Match } from "../types";

export function MatchingPage() {
  const { id, name } = useAccount();
  const [match, setMatch] = useState<Match>({
    maxUserSize: 5,
    users: [],
  });
  const [maxUser, setMaxUser] = useState(undefined);
  const [gid, setGid] = useState("");

  const fetchMatch = async (gid: string) => {
    const res = await fetch("/match/" + gid, { method: "get" });
    return await res.json();
  };

  useEffect(() => {
    if (!gid) {
      return;
    }
    fetchMatch(gid).then((data) => setMatch(data));
  }, [gid]);

  return (
    <div className="flex flex-col p-2">
      <input
        value={gid}
        onChange={(e) => setGid(e.target.value)}
        placeholder="gid"
      />

      {gid && (
        <button
          className="w-20 bg-slate-300 rounded-md p-1 pr-2"
          onClick={async () => {
            const res = await fetch("/match/" + gid, {
              method: "post",
              body: JSON.stringify({ id, name }),
            });

            const data = await res.json();
            setMatch(data);
            setMaxUser(data.maxUserSize);
          }}
        >
          match!
        </button>
      )}

      {maxUser && (
        <div>
          {match.users.length}/{maxUser}
        </div>
      )}

      <MatchResult match={match} />
    </div>
  );
}
