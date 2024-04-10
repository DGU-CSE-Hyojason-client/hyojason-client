import { useEffect, useState } from "react";
import { Account } from "../../../types";
import { getMatch, postMatch } from "../../../apis/match";

export default function Match({ account }: { account: Account }) {
  const [status, setStatus] = useState<
    "idle" | "matching" | "matched" | undefined
  >(undefined);

  function get() {
    getMatch().then((data) => {
      setStatus(data.status);
    });
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span>
        {account.name}: {account.role}
      </span>

      {status === "idle" && (
        <button
          onClick={async () => {
            await postMatch();
            setStatus("matching");
          }}
        >
          매칭
        </button>
      )}
      {status === "matching" && <div>매칭중입니다...</div>}
      {/* {status === "matched" && <MatchResult match={}/>} */}
    </div>
  );
}
