import useAccount from "../hooks/useAccount";
import { ROLE } from "../types";
import Matches from "./matching/dolbomi/Matches";
import Match from "./matching/elder/Match";

export function MatchingPage() {
  const { account } = useAccount();

  return (
    <>
      {!account && <></>}
      {account?.role === ROLE.ADMIN && (
        <div className="flex flex-col p-2">
          <Matches account={account} />
        </div>
      )}
      {account?.role === ROLE.NORMAL && (
        <div className="flex flex-col p-2">
          <Match account={account} />
        </div>
      )}
    </>
  );
}
