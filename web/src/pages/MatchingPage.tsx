import useAccount from "../hooks/useAccount";
import Matches from "./matching/dolbomi/Matches";
import Match from "./matching/elder/Match";

export function MatchingPage() {
  const { account } = useAccount();

  return (
    <>
      {!account && <></>}
      {account?.role === "dolbomi" && (
        <div className="flex flex-col p-2">
          <Matches account={account} />
        </div>
      )}
      {account?.role === "elder" && (
        <div className="flex flex-col p-2">
          <Match account={account} />
        </div>
      )}
    </>
  );
}
