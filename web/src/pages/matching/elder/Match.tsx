import { useEffect, useState } from "react";
import { Account } from "../../../types";
import { getElderGroupStatus, getElderGroupApply } from "../../../apis/match";
import ElderManIcon from "../../../assets/icons/elder_man.svg?react";
import ElderWomanIcon from "../../../assets/icons/elder_woman.svg?react";
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
          className="bg-[#f3eee8] rounded-md p-2 px-1 text-lg"
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
          <button className="bg-[#f3eee8] rounded-md p-2 px-1 text-lg">
            그룹 형성 중입니다..
          </button>
          <div className="flex flex-col gap-2 text-lg">
            <div>{res.regionId}</div>
          </div>
        </>
      )}
      {status === "finish" && (
        <div className="flex flex-col gap-4 text-black">
          <div className="flex flex-col bg-[#f3eee8] p-2 rounded-md gap-2">
            <div className="text-2xl font-extrabold">나의 그룹</div>
          </div>
          <div className="flex flex-col bg-[#f3eee8] p-2 rounded-md gap-2">
            <div className="text-2xl font-extrabold">그룹 안 사용자</div>
            <div className="grid grid-cols-2 gap-4 text-center items-center">
              {res?.memberList.map((v: string, i: number) => (
                <div
                  key={i}
                  className="flex text-2xl text-center items-center bg-[#fff] p-2 gap-2 rounded-md"
                >
                  <span>
                    {i % 2 == 0 ? <ElderManIcon /> : <ElderWomanIcon />}
                  </span>
                  {v}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col bg-[#f3eee8] p-2 rounded-md gap-2">
            <div className="text-2xl font-extrabold">그룹 관심사</div>
            <div className="grid grid-cols-2 gap-4 text-center items-center">
              {res?.keyword.map((v: string, i: number) => (
                <div
                  key={i}
                  className="flex flex-col text-2xl bg-[#fff] p-2 gap-2 rounded-md"
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/*<div className="flex flex-col gap-2">*/}
          {/*  <div>{res.regionId}</div>*/}
          {/*  <div>키워드: {res.keyword.join(" · ")}</div>*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
}
