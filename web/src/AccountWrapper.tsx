import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "./store";
import { login } from "./apis/account";
import { Account, ROLE } from "./types";

export const MOCK_NORMAL: Account = {
  id: "zxc123",
  password: "zxc123",
  name: "효자손",
  role: ROLE.NORMAL,
};

export const MOCK_ADMIN: Account = {
  id: "admin",
  password: "admin",
  name: "admin",
  role: ROLE.ADMIN,
};

export function AccountWrapper({ children }: { children: React.ReactNode }) {
  const { setAccount } = useAccountStore(
    useShallow((state) => ({
      setAccount: state.setAccount,
    }))
  );

  useEffect(() => {
    const account = MOCK_NORMAL;

    login(account).then(() => {
      setAccount(account);
    });
  }, [setAccount]);

  return <>{children}</>;
}
