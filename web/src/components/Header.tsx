import { useEffect } from "react";
import Icon from "../assets/icons/hand_love.svg?react";
import useAccount from "../hooks/useAccount";
import { login } from "../apis/account";
import { ROLE } from "../types";
import { MOCK_ADMIN, MOCK_NORMAL } from "../AccountWrapper";

export default function Header() {
  const { account, id, name, role, setRole, setAccount } = useAccount();

  useEffect(() => {
    if (!account) {
      return;
    }

    login(account).then(async () => {
      setAccount(account);
    });
  }, [account, id, name, role, setAccount]);

  return (
    <div className="flex items-center justify-between bg-slate-800 p-3 font-extralight text-3xl">
      <div className="flex gap-1 items-center">
        <Icon className="w-10 h-10" />
        <span>hyojason</span>
      </div>

      <select
        className="w-24 bg-slate-700 rounded-md text-sm p-1"
        value={role}
        onChange={(e) => {
          if (e.target.value === ROLE.NORMAL) {
            setRole(ROLE.NORMAL);
            setAccount(MOCK_NORMAL);
          } else {
            setRole(ROLE.ADMIN);
            setAccount(MOCK_ADMIN);
          }
        }}
      >
        <option value={ROLE.NORMAL}>노인</option>
        <option value={ROLE.ADMIN}>돌보미</option>
      </select>
    </div>
  );
}
