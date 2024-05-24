export function ChatPage() {
  return (
    <div className="container mx-auto py-4 px-2">
      <div className="max-w-lg mx-auto bg-slate-600 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="overflow-y-auto">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-end">
                <div className="mr-2 bg-slate-100 rounded-lg p-2">
                  <p className="text-md text-slate-800">
                    안녕하세요, 요즘 날씨가 좋아서 골프하기 좋은 거 같아요!
                  </p>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2 bg-slate-400 rounded-lg p-2">
                  <p className="text-md text-slate-800">
                    네 맞아요! 골프를 즐기러 나가시는 건가요?
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="mr-2 bg-slate-100 rounded-lg p-2">
                  <p className="text-md text-slate-800">
                    네 그렇죠! 그런데 요즘 기술이 많이 발전했나요?
                  </p>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <div className="flex items-center justify-end">
                <div className="mr-2 bg-slate-100 rounded-lg p-2">
                  <p className="text-md text-slate-800">
                    예전에 비해 골프장비나 기술적인게 바뀐 거 같네요?
                  </p>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2 bg-slate-400 rounded-lg p-2">
                  <p className="text-md text-slate-800">
                    네 많이 바뀌었죠. 특히 클럽과 공의 디자인, 재료 등이 많이
                    발전했고, 요즘에는 스크린 골프장과 같은 시설도 생겨났답니다.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="mr-2 bg-slate-100 rounded-lg p-2">
                  <p className="text-md text-slate-800">
                    그렇군요! 그럼 요즘 골프를 배우려면 어떻게 해야 할까요?
                  </p>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>

              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2 bg-slate-400 rounded-lg p-2">
                  <p className="text-md font-extrabold text-slate-800">· · ·</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
