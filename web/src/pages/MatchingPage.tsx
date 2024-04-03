import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "../store";
import { useEffect, useState } from "react";

export function MatchingPage() {
  const account = useAccountStore(useShallow((state) => state.account));

  const [id, setId] = useState(account?.id || "");
  const [name, setName] = useState(account?.name || "");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!account?.id || !account?.name) {
      return;
    }
    setId(account?.id);
    setName(account?.name);
  }, [account]);

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

      <button
        className="w-20 bg-slate-300 rounded-md p-1 pr-2"
        onClick={async () => {
          const res = await fetch("/match/123", {
            method: "post",
            body: JSON.stringify({ id, name }),
          });

          const data = await res.json();
          setUsers(data.users || []);
        }}
      >
        match!
      </button>

      {users.map(({ id, name }, i) => (
        <div key={`${id}-${i}`}>
          {id}, {name}
        </div>
      ))}
    </div>
  );
}
