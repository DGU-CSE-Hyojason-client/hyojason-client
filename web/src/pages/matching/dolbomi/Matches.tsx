import { useEffect, useState } from "react";
import { Account, Match, User } from "../../../types";
import { getMatch } from "../../../apis/match";

export default function Matches({ account }: { account: Account }) {
  const [matched, setMatched] = useState<{ [gid: string]: Match }>({});
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getMatch().then((data) => {
      setMatched(data.matched);
      setUsers(data.users);
    });
  }, []);

  return (
    <div>
      <span>
        {account.name}: {account.role}
      </span>

      <div className="flex flex-col gap-3">
        <div className="border-2">
          <span>매칭 큐</span>
          <div className="flex flex-col gap-2 text-sm">
            {users.map((user) => (
              <span>{user.name}</span>
            ))}
          </div>
        </div>
        {Object.entries(matched).map(([gid, match]) => (
          <div className="border-2">
            <span>gid: {gid}</span>
            <div className="flex flex-col gap-2 text-sm">
              {match.users.map((user) => (
                <span>{user.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
