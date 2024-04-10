import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "../store";
import { useEffect, useState } from "react";

export default function useAccount() {
  const { account, setAccount } = useAccountStore(
    useShallow(({ account, setAccount }) => ({ account, setAccount }))
  );

  const [id, setId] = useState(account?.id || "");
  const [name, setName] = useState(account?.name || "");
  const [role, setRole] = useState(account?.role || "elder");

  useEffect(() => {
    if (!account?.id || !account?.name) {
      return;
    }

    setId(account?.id);
    setName(account?.name);
  }, [account]);

  return { id, name, role, setId, setName, setRole, account, setAccount };
}
