import { useEffect, useState } from "react";
import { Account } from "../../../types";
import { getElderGroupStatus, getElderGroupApply } from "../../../apis/match";
// import MatchResult from "./MatchResult.tsx";

export default function Match({ account }: { account: Account }) {
  const [status, setStatus] = useState<
    "idle" | "ongoing" | "finish" | undefined
  >(undefined);
  const [res, setRes] = useState<any>();

  function get() {
    getElderGroupStatus().then((data) => {
      console.log(data);
      if (data) {
        setStatus(data.status);
        setRes(data);
      }
    });
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="flex flex-col gap-2 text-black">
      <span className="hidden">
        {account.name}: {account.role}
      </span>

      {status === "idle" && (
        <button
          className="bg-[#f3eee8] rounded-md p-2 px-1"
          onClick={async () => {
            await getElderGroupApply();
            setStatus("ongoing");
          }}
        >
          그룹 요청하기
        </button>
      )}
      {status === "ongoing" && (
        <>
          <button className="bg-[#f3eee8] rounded-md p-2 px-1">
            그룹 형성 중입니다..
          </button>
          <div className="flex flex-col gap-2">
            <div>{res.regionId}</div>
            <div>유저 수: {res.applicant}</div>
          </div>
        </>
      )}
      {status === "finish" && (
        <>
          <button className="bg-[#f3eee8] rounded-md p-2 px-1">
            나의 그룹
          </button>
          <div className="flex flex-col gap-2">
            <div>{res.regionId}</div>
            {/*<div>키워드: {res.keyword.join(" · ")}</div>*/}
          </div>
        </>
      )}
    </div>
  );
}
