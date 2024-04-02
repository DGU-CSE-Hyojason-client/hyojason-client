import { create } from "zustand";

type Account = {
  id: string;
  name: string;
};

interface AccountStore {
  account?: Account;
  setAccount: (newAccount: Account) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  setAccount: (account) => set({ account }),
}));

export default useAccountStore;
