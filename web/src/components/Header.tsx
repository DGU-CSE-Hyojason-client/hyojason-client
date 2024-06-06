import { useEffect } from "react";
import useAccount from "../hooks/useAccount";
import { login } from "../apis/account";
import { Account, ROLE } from "../types";
import { MOCK_ADMIN, MOCK_NORMAL } from "../AccountWrapper";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { account, id, name, role, setRole, setAccount } = useAccount();
  const history = useNavigate();
  useEffect(() => {
    if (!account) {
      return;
    }

    let ac: Account;

    if (role === ROLE.NORMAL) {
      const local = localStorage.getItem("account_normal");
      if (local) {
        ac = JSON.parse(local);
      } else {
        ac = MOCK_NORMAL;
      }
    } else {
      const local = localStorage.getItem("account_admin");
      if (local) {
        ac = JSON.parse(local);
      } else {
        ac = MOCK_ADMIN;
      }
    }

    if (account.id === ac.id) {
      return;
    }

    login(ac).then(async () => {
      setAccount(ac);
    });
  }, [account, id, name, role, setAccount]);

  return (
    <div className="flex items-center justify-between bg-[#F3EEE8] p-3 font-extralight text-3xl">
      <div
        className="flex gap-1 items-center"
        onClick={() => {
          location.href = "/";
        }}
      >
        <img src="logo.png" className="w-14 h-14 mr-2" />
      </div>

      <button
        className="text-[#f3eee8]"
        onClick={() => {
          history("/config");
        }}
      >
        zz
      </button>

      <select
        className="w-24 bg-[#e5be8f] rounded-md text-sm p-1 text-black"
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
