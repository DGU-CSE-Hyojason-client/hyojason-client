import { useEffect } from "react";
import apeach from "../assets/imgs/apeach.jpg";
import useAccount from "../hooks/useAccount";

export function HomePage() {
  const { id, name, role, setId, setName, setRole, setAccount } = useAccount();

  useEffect(() => {
    setAccount({ id, name, role });
  }, [id, name, role, setAccount]);

  return (
    <div>
      <div className="flex flex-col p-2">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="id"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
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
