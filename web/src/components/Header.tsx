import { useEffect } from "react";
import Icon from "../assets/icons/hand_love.svg?react";
import useAccount from "../hooks/useAccount";
import { login, me } from "../apis/account";

export default function Header() {
  const { account, id, name, role, setRole, setAccount } = useAccount();

  useEffect(() => {
    if (!account) {
      return;
    }

    if (account.role === role) {
      return;
    }

    login({ id, name, role }).then(async () => {
      setAccount({ id, name, role });
      const data = await me();
      console.log(data);
    });
  }, [account, id, name, role, setAccount]);

  return (
    <div className="flex items-center justify-between bg-slate-800 p-3 font-extralight text-xl">
      <div className="flex gap-1 items-center">
        <Icon className="w-10 h-10" />
        <span>hyojason</span>
      </div>

      <select
        className="w-24 bg-black"
        value={role}
        onChange={(e) => setRole(e.target.value as "elder" | "dolbomi")}
      >
        <option value="elder">노인</option>
        <option value="dolbomi">돌보미</option>
      </select>
    </div>
  );
}
