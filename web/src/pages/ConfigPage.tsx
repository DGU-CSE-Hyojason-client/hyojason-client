import { Account, ROLE } from "../types.ts";

const accounts_normal: { [key in string]: Account } = {
  user2002: {
    id: "user2002",
    password: "1234",
    name: "효자손",
    role: ROLE.NORMAL,
  },
  user1: {
    id: "user1",
    password: "1234",
    name: "user1",
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
  return (
    <div className="p-2">
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
            }}
          >
            변경
          </div>
        </div>
      ))}
    </div>
  );
}
