import { Account, ROLE } from "../types.ts";
import useAccount from "../hooks/useAccount.ts";

const accounts_normal: { [key in string]: Account } = {
  user1: {
    id: "user1",
    password: "1234",
    name: "user1",
    role: ROLE.NORMAL,
  },
  user2: {
    id: "user2",
    password: "1234",
    name: "user2",
    role: ROLE.NORMAL,
  },

  user201: {
    id: "user201",
    password: "1234",
    name: "user201",
    role: ROLE.NORMAL,
  },
  user203: {
    id: "user203",
    password: "1234",
    name: "user203",
    role: ROLE.NORMAL,
  },
  user1000: {
    id: "user1000",
    password: "1234",
    name: "user1000",
    role: ROLE.NORMAL,
  },
};

const accounts_admin: { [key in string]: Account } = {
  user2000: {
    id: "user2000",
    password: "1234",
    name: "admin",
    role: ROLE.ADMIN,
  },
};

export default function ConfigPage() {
  //@ts-ignore
  const { account, id, name, role, setRole, setAccount } = useAccount();

  return (
    <div className="p-2">
      <div>현재 유저: {account?.id}</div>
      <h1>노인</h1>
      {Object.entries(accounts_normal).map(([key, value]) => (
        <div key={key} className="flex gap-2">
          <div>{key}</div>
          <div>{value.name}</div>
          <div>{value.role}</div>
          <div
            className="bg-amber-200 rounded-md px-1"
            onClick={() => {
              localStorage.setItem("account_normal", JSON.stringify(value));
              alert("변경되었습니다.");
              location.reload();
            }}
          >
            변경
          </div>
        </div>
      ))}

      <br />

      <h1>돌보미</h1>
      {Object.entries(accounts_admin).map(([key, value]) => (
        <div key={key} className="flex gap-2">
          <div>{key}</div>
          <div>{value.name}</div>
          <div>{value.role}</div>
          <div
            className="bg-amber-200 rounded-md px-1"
            onClick={() => {
              localStorage.setItem("account_admin", JSON.stringify(value));
              alert("변경되었습니다.");
              location.reload();
            }}
          >
            변경
          </div>
        </div>
      ))}
    </div>
  );
}
