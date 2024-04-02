import apeach from "../assets/imgs/apeach.jpg";
import { useAccountStore } from "../store";
import { useShallow } from "zustand/react/shallow";

export function HomePage() {
  const { setAccount } = useAccountStore(
    useShallow((state) => ({
      setAccount: state.setAccount,
    }))
  );

  return (
    <div>
      home page
      <button
        className="border-2"
        onClick={() => setAccount({ id: "hyojason", name: "홍길동" })}
      >
        set account
      </button>
      <img src={apeach} />
    </div>
  );
}
