import { useEffect, useState } from "react";
import { Account } from "../../../types";
import {
  Group,
  GroupDetail,
  getCaregiverGroupStatus,
} from "../../../apis/match";

export default function Matches({ account }: { account: Account }) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);

  useEffect(() => {
    getCaregiverGroupStatus().then((data) => {
      if (data) {
        console.log(data);
        setGroupList(data);
        // setUsers(data.users);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedGroup) {
      return;
    }

    // getGroupDetail(selectedGroup?.groupId).then((data) => {
    //   setGroupDetail(data);
    // });

    setGroupDetail({
      userList: selectedGroup.users,
    });
  }, [selectedGroup]);

  if (!selectedGroup) {
    return (
      <div>
        <span className="hidden">
          {account.name}: {account.role}
        </span>

        <div className="flex flex-col gap-3 text-slate-200">
          <div className="flex flex-col gap-2 bg-[#f3eee8] rounded-md p-2">
            <span className="text-black">매칭 큐</span>
            <div className="flex gap-2 text-sm flex-wrap">
              {/* {users.map((user) => (
                <span
                  key={user.id}
                  className="bg-slate-700 text-center p-1 px-2 rounded-full w-20 text-nowrap"
                >
                  {user.name}
                </span>
              ))} */}
            </div>
          </div>
          <div className="flex flex-col bg-[#f3eee8] p-2 rounded-md gap-2">
            <span className="text-black">매칭 완료 그룹</span>
            {groupList.map(({ groupId, keywordsList, users }) => (
              <div
                className="bg-[#e5be8f] rounded-md p-2 flex justify-between text-black"
                onClick={() =>
                  setSelectedGroup({
                    groupId,
                    keyword: [],
                    keywordsList,
                    memberNum: 5,
                    users,
                  })
                }
                key={groupId}
              >
                <div className="flex gap-2 text-xs">
                  {users.map((user) => (
                    <span
                      className="flex px-1 items-center bg-[#f3eee8] rounded-md"
                      key={user.id}
                    >
                      {user.name}
                    </span>
                  ))}
                </div>
                {keywordsList.join(" · ")}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-black">
      <div className="flex flex-col gap-2 bg-[#e5be8f] rounded-md p-2">
        <div>그룹 id: {selectedGroup.groupId}</div>
        <div>키워드: {selectedGroup.keywordsList.join(" · ")}</div>
        <div>인원: {selectedGroup.memberNum}</div>
        <div>매칭된 사용자</div>
        <div className="flex flex-col bg-[#e5be8f] p-2 rounded-md gap-2">
          {groupDetail?.userList.map((user) => (
            <div
              className="bg-[#f3eee8] rounded-md p-2 flex gap-2"
              key={user.id}
            >
              <span>
                {user.name}({user.id})
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-[#e5be8f] rounded-md p-2 px-1"
        onClick={() => setSelectedGroup(null)}
      >
        이전
      </button>
    </div>
  );
}
