import useAccount from "../hooks/useAccount.ts";
import ElderManIcon from "../assets/icons/elder_man.svg?react";
import ElderWomanIcon from "../assets/icons/elder_woman.svg?react";

export function HomePage() {
  const { account } = useAccount();

  if (!account || account.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col gap-4 text-black">
        <div className="flex flex-col bg-[#f3eee8] p-2 rounded-md gap-2">
          <div className="text-2xl font-extrabold">매칭된 그룹 정보</div>
        </div>
        <div className="flex flex-col bg-[#f3eee8] p-4 rounded-md gap-4">
          <div className="text-2xl font-extrabold bg-[#fff] p-2">
            키워드: 골프, 수영
          </div>
          <div className="grid grid-cols-2 gap-4 text-center items-center">
            <div className="flex flex-col text-lg bg-[#fff] p-4 gap-2">
              <div className="h-20">
                <ElderManIcon className="w-full h-20" />
              </div>
              <div className="text-xs">
                <div>나이: 60</div>
                <div>지역: 송파구</div>
                <div>전화번호: 010-3412-3490</div>
              </div>
            </div>
            <div className="flex flex-col text-lg bg-[#fff] p-4 gap-2">
              <div className="h-20">
                <ElderManIcon className="w-full h-20" />
              </div>
              <div className="text-xs">
                <div>나이: 60</div>
                <div>지역: 송파구</div>
                <div>전화번호: 010-3412-3490</div>
              </div>
            </div>
            <div className="flex flex-col text-lg bg-[#fff] p-4 gap-2">
              <div className="h-20">
                <ElderManIcon className="w-full h-20" />
              </div>
              <div className="text-xs">
                <div>나이: 60</div>
                <div>지역: 송파구</div>
                <div>전화번호: 010-3412-3490</div>
              </div>
            </div>
            <div className="flex flex-col text-lg bg-[#fff] p-4 gap-2">
              <div className="h-20">
                <ElderWomanIcon className="w-full h-20" />
              </div>
              <div className="text-xs">
                <div>나이: 60</div>
                <div>지역: 송파구</div>
                <div>전화번호: 010-3412-3490</div>
              </div>
            </div>
            <div className="flex flex-col text-lg bg-[#fff] p-4 gap-2">
              <div className="h-20">
                <ElderWomanIcon className="w-full h-20" />
              </div>
              <div className="text-xs">
                <div>나이: 60</div>
                <div>지역: 송파구</div>
                <div>전화번호: 010-3412-3490</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
