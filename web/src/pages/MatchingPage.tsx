import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "../store";
import { useEffect, useState } from "react";

export function MatchingPage() {
  const account = useAccountStore(useShallow((state) => state.account));

  const [id, setId] = useState(account?.id || "");
  const [name, setName] = useState(account?.name || "");

  useEffect(() => {
    if (!account?.id || !account?.name) {
      return;
    }
    setId(account?.id);
    setName(account?.name);
  }, [account]);

  return (
    <div className="flex flex-col">
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
      <span>account</span>
      <span>id: {id || "None"}</span>
      <span>name: {name || "None"}</span>

      <button
        onClick={() => {
          console.log({ id, name });
        }}
      >
        match!
      </button>
    </div>
  );
}
