import { useEffect, useState } from "react";

export function ChatPage() {
  const [inputValue, setInputValue] = useState("Initial Text");

  useEffect(() => {
    const handleChangeInput = (event: CustomEvent) => {
      console.log(event.detail);
      setInputValue(event.detail);
    };

    const rootElement = document.getElementById("root");

    rootElement?.addEventListener(
      "changeInput",
      handleChangeInput as EventListener
    );
    return () => {
      rootElement?.removeEventListener(
        "changeInput",
        handleChangeInput as EventListener
      );
    };
  }, []);

  return (
    <div className="container mx-auto py-4 px-2">
      <div className="max-w-lg mx-auto bg-slate-600 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="overflow-y-auto">
            <div className="flex flex-col space-y-2">
              <UserChat chat="안녕하세요, 요즘 날씨가 좋아서 골프하기 좋은 거 같아요!" />

              <BotChat chat="네 맞아요! 골프를 즐기러 나가시는 건가요?" />

              <UserChat chat="네 그렇죠! 그런데 요즘 기술이 많이 발전했나요? 예전에 비해 골프장비나 기술적인게 바뀐 거 같네요?" />

              <BotChat
                chat="네 많이 바뀌었죠. 특히 클럽과 공의 디자인, 재료 등이 많이
                    발전했고, 요즘에는 스크린 골프장과 같은 시설도 생겨났답니다."
              />

              <UserChat chat="그렇군요! 그럼 요즘 골프를 배우려면 어떻게 해야 할까요?" />

              <BotChat chat="· · ·" />

              {inputValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BotChat({ chat }: { chat: string }) {
  return (
    <div className="flex items-center">
      <img
        src="https://via.placeholder.com/40"
        alt="Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="ml-2 bg-slate-400 rounded-lg p-2">
        <p className="text-md text-slate-800">{chat}</p>
      </div>
    </div>
  );
}

function UserChat({ chat }: { chat: string }) {
  return (
    <div className="flex items-center justify-end">
      <div className="mr-2 bg-slate-100 rounded-lg p-2">
        <p className="text-md text-slate-800">{chat}</p>
      </div>
      <img
        src="https://via.placeholder.com/40"
        alt="Avatar"
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}
