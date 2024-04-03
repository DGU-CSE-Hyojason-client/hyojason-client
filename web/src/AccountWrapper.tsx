import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAccountStore } from "./store";

export function AccountWrapper({ children }: { children: React.ReactNode }) {
  const { setAccount } = useAccountStore(
    useShallow((state) => ({
      setAccount: state.setAccount,
    }))
  );

  useEffect(() => {
    setAccount({ id: "hyojason2024", name: "효자손" });
  }, [setAccount]);

  return <>{children}</>;
}
