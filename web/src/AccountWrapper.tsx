import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "./store";
import { login } from "./apis/account";
import { Account, ROLE } from "./types";

export const MOCK_NORMAL: Account = {
  id: "user2002",
  password: "1234",
  name: "효자손",
  role: ROLE.NORMAL,
};

export const MOCK_ADMIN: Account = {
  id: "user2000",
  password: "1234",
  name: "admin",
  role: ROLE.ADMIN,
};

export function AccountWrapper({ children }: { children: React.ReactNode }) {
  const { account, setAccount } = useAccountStore(
    useShallow((state) => ({
      account: state.account,
      setAccount: state.setAccount,
    }))
  );

  useEffect(() => {
    const account = MOCK_NORMAL;

    login(account).then(() => {
      setAccount(account);
    });
  }, [setAccount]);

  if (!account) {
    return <></>;
  }

  return <>{children}</>;
}
