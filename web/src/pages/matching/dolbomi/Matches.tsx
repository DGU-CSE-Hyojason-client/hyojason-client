import { useEffect, useState } from "react";
import { Account, User } from "../../../types";
import { Group, getCaregiverGroupStatus } from "../../../apis/match";

export default function Matches({ account }: { account: Account }) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getCaregiverGroupStatus().then((data) => {
      if (data) {
        console.log(data);
        setGroupList(data.groupList);
        setUsers(data.users);
      }
    });
  }, []);

  return (
    <div>
      <span className="hidden">
        {account.name}: {account.role}
      </span>

      <div className="flex flex-col gap-3">
        <div className="border-2">
          <span>매칭 큐</span>
          <div className="flex flex-col gap-2 text-sm">
            {users.map((user) => (
              <span key={user.id}>{user.name}</span>
            ))}
          </div>
        </div>
        {groupList.map(({ groupId, keyword }) => (
          <div className="border-2" key={groupId}>
            <span>groupId: {groupId}</span>
            <div className="flex flex-col gap-2 text-sm">
              {keyword.map((k, i) => (
                <span key={`${k}-${i}`}>{k}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
