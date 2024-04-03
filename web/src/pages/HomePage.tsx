import apeach from "../assets/imgs/apeach.jpg";
import useAccount from "../hooks/useAccount";

export function HomePage() {
  const { setAccount } = useAccount();

  return (
    <div>
      home page
      <button
        className="border-2"
        onClick={() =>
          setAccount({ id: "hyojason_changed", name: "홍길동_changed" })
        }
      >
        set account
      </button>
      <img src={apeach} />
    </div>
  );
}
