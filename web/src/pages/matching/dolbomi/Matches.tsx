import { useEffect, useState } from "react";
import { Account, User } from "../../../types";
import {
  Group,
  GroupDetail,
  getCaregiverGroupStatus,
  getGroupDetail,
} from "../../../apis/match";

export default function Matches({ account }: { account: Account }) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);

  useEffect(() => {
    getCaregiverGroupStatus().then((data) => {
      if (data) {
        console.log(data);
        setGroupList(data.groupList);
        setUsers(data.users);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedGroup) {
      return;
    }

    getGroupDetail(selectedGroup?.groupId).then((data) => {
      setGroupDetail(data);
    });
  }, [selectedGroup]);

  if (!selectedGroup) {
    return (
      <div>
        <span className="hidden">
          {account.name}: {account.role}
        </span>

        <div className="flex flex-col gap-3 text-slate-200">
          <div className="flex flex-col gap-2 bg-slate-800 rounded-md p-2">
            <span>매칭 큐</span>
            <div className="flex gap-2 text-sm flex-wrap">
              {users.map((user) => (
                <span
                  key={user.id}
                  className="bg-slate-700 text-center p-1 px-2 rounded-full w-20 text-nowrap"
                >
                  {user.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col bg-slate-800 p-2 rounded-md gap-2">
            <span>매칭 완료 그룹</span>
            {groupList.map(({ groupId, keyword, memberNum }) => (
              <div
                className="bg-slate-700 rounded-md p-2 flex justify-between"
                onClick={() =>
                  setSelectedGroup({ groupId, keyword, memberNum })
                }
                key={groupId}
              >
                <span>id: {groupId}</span>
                <div className="flex gap-2 text-sm">
                  {/* {keyword.map((k, i) => (
                    <span
                      className="flex px-1 items-center bg-slate-800 rounded-md"
                      key={`${k}-${i}`}
                    >
                      {k}
                    </span>
                  ))} */}
                  {keyword.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-slate-400">
      <div className="flex flex-col gap-2 bg-slate-800 rounded-md p-2">
        id: {selectedGroup.groupId}
        <div className="flex flex-col bg-slate-800 p-2 rounded-md gap-2">
          {groupDetail?.userList.map((user) => (
            <div
              className="bg-slate-700 rounded-md p-2 flex gap-2"
              key={user.id}
            >
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-slate-800 rounded-md p-2 px-1"
        onClick={() => setSelectedGroup(null)}
      >
        이전
      </button>
    </div>
  );
}
