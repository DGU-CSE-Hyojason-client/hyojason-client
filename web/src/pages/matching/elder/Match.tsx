import { useEffect, useState } from "react";
import { Account } from "../../../types";
import { getElderGroupStatus, postElderGroupApply } from "../../../apis/match";

export default function Match({ account }: { account: Account }) {
  const [status, setStatus] = useState<
    "idle" | "ongoing" | "finish" | undefined
  >(undefined);

  function get() {
    getElderGroupStatus().then((data) => {
      console.log(data);
      if (data) {
        setStatus(data.status);
      }
    });
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="flex flex-col gap-2 text-slate-200">
      <span className="hidden">
        {account.name}: {account.role}
      </span>

      {status === "idle" && (
        <button
          className="bg-[#f3eee8] rounded-md p-2 px-1"
          onClick={async () => {
            await postElderGroupApply();
            setStatus("ongoing");
          }}
        >
          매칭
        </button>
      )}
      {status === "ongoing" && (
        <button className="bg-[#f3eee8] rounded-md p-2 px-1">
          매칭중입니다...
        </button>
      )}
      {/* {status === "finish" && <MatchResult match={}/>} */}
    </div>
  );
}
