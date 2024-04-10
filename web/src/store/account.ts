import { create } from "zustand";
import { Account } from "../types";

interface AccountStore {
  account?: Account;
  setAccount: (newAccount: Account) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  setAccount: (account) => set({ account }),
}));

export default useAccountStore;
