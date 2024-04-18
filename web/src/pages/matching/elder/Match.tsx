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
    <div className="flex flex-col gap-2">
      <span className="hidden">
        {account.name}: {account.role}
      </span>

      {status === "idle" && (
        <button
          onClick={async () => {
            await postElderGroupApply();
            setStatus("ongoing");
          }}
        >
          매칭
        </button>
      )}
      {status === "ongoing" && <div>매칭중입니다...</div>}
      {/* {status === "finish" && <MatchResult match={}/>} */}
    </div>
  );
}
