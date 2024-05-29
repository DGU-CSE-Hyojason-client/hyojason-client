import { useEffect } from "react";
import Icon from "../assets/icons/hand_love.svg?react";
import useAccount from "../hooks/useAccount";
import { login } from "../apis/account";
import { Account, ROLE } from "../types";
import { MOCK_ADMIN, MOCK_NORMAL } from "../AccountWrapper";

export default function Header() {
  const { account, id, name, role, setRole, setAccount } = useAccount();

  useEffect(() => {
    if (!account) {
      return;
    }

    let ac: Account;

    if (role === ROLE.NORMAL) {
      ac = MOCK_NORMAL;
    } else {
      ac = MOCK_ADMIN;
    }

    login(ac).then(async () => {
      setAccount(ac);
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
          } else {
            setRole(ROLE.ADMIN);
          }
        }}
      >
        <option value={ROLE.NORMAL}>노인</option>
        <option value={ROLE.ADMIN}>돌보미</option>
      </select>
    </div>
  );
}
