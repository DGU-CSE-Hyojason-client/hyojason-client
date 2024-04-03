import { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";

export function MatchingPage() {
  const { id, name, setId, setName } = useAccount();
  const [users, setUsers] = useState([]);
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
    console.log("send");
    fetchMatch(gid).then((data) => setUsers(data["users"]));
  }, [gid]);

  return (
    <div className="flex flex-col p-2">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="id"
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
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
            setUsers(data.users || []);
            setMaxUser(data.maxUserSize);
          }}
        >
          match!
        </button>
      )}

      {maxUser && (
        <div>
          {users.length}/{maxUser}
        </div>
      )}

      <ul>
        {users.map(({ id, name }, i) => (
          <li key={`${id}-${i}`}>
            {id}, {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
