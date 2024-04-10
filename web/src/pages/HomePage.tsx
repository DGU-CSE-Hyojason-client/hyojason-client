import { useEffect } from "react";
import apeach from "../assets/imgs/apeach.jpg";
import useAccount from "../hooks/useAccount";
import { login, me } from "../apis/account";

export function HomePage() {
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
    <div>
      <div className="flex flex-col p-2">
        <select
          className="w-24"
          value={role}
          onChange={(e) => setRole(e.target.value as "elder" | "dolbomi")}
        >
          <option value="elder">노인</option>
          <option value="dolbomi">돌보미</option>
        </select>
      </div>
      <img src={apeach} />
    </div>
  );
}
