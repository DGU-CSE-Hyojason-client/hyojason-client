import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "./store";
import { login } from "./apis/account";
import { ROLE } from "./types";

export function AccountWrapper({ children }: { children: React.ReactNode }) {
  const { setAccount } = useAccountStore(
    useShallow((state) => ({
      setAccount: state.setAccount,
    }))
  );

  useEffect(() => {
    const account = { id: "hyojason2024", name: "효자손", role: ROLE.elder };
    setAccount(account);
    login(account);
  }, [setAccount]);

  return <>{children}</>;
}
