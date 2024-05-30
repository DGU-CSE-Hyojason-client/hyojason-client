import { useEffect, useRef, useState } from "react";
import useAccount from "../hooks/useAccount";
import { Dialog, getDialogList, getReply } from "../apis/chat";

const initialText = "Initial Text";

export function ChatPage() {
  const { account } = useAccount();
  const [inputValue, setInputValue] = useState(initialText);
  const [chatCount, setChatCount] = useState(0);
  const [dialogList, setDialogList] = useState<Dialog[]>([]);
  const [loading, setLoading] = useState(true);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDialogList().then((data) => {
      if (!data) {
        return;
      }
      setDialogList(data);

      const gdt = setTimeout(() => {
        setLoading(false);
      }, 200);

      return () => clearTimeout(gdt);
    });
  }, [account]);

  useEffect(() => {
    if (!chatBoxRef.current) {
      return;
    }
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chatBoxRef.current]);

  useEffect(() => {
    const handleChangeInput = (event: CustomEvent) => {
      console.log(event.detail);
      setInputValue(event.detail);
      setChatCount((c) => c + 1);
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

  useEffect(() => {
    if (inputValue === initialText) {
      return;
    }

    setDialogList((before) => {
      const last = before.at(before.length - 1);
      const id = last ? last.id + 99 : 99;
      return [
        ...before,
        {
          id,
          bundleId: id,
          insertDate: Date.now().toLocaleString(),
          sentence: inputValue,
          type: "user_question",
        },
      ];
    });

    getReply(inputValue).then((answer) => {
      if (answer) {
        setDialogList((before) => {
          const last = before.at(before.length - 1);
          const id = last ? last.id + 99 : 99;
          return [
            ...before,
            {
              id,
              bundleId: id,
              insertDate: Date.now().toLocaleString(),
              sentence: answer,
              type: "bot_answer",
            },
          ];
        });
      }
    });

    const t = setTimeout(() => {
      console.log("zz");
    }, 1000);

    return () => clearTimeout(t);
  }, [chatCount, inputValue]);

  const [scrollTop, setScrollTop] = useState(2000);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    if (!chatBoxRef.current) {
      return;
    }
    if (scrollTop < chatBoxRef.current.scrollHeight - 500) {
      setShowScrollDown(true);
    } else {
      setShowScrollDown(false);
    }
  }, [scrollTop]);

  // useEffect(() => {
  //   const tz = setInterval(() => {
  //     console.log("zz");
  //     if (!chatBoxRef.current) {
  //       return;
  //     }

  //     chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  //   }, 1000);

  //   return () => clearInterval(tz);
  // }, []);

  return (
    <div className="container mx-auto py-4 px-2">
      <div className="max-w-lg mx-auto bg-slate-600 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="overflow-y-auto">
            <div
              ref={chatBoxRef}
              className="flex flex-col space-y-2 overflow-scroll h-[400px]"
              style={(() => {
                return { visibility: loading ? "hidden" : "inherit" };
              })()}
              onScroll={() => {
                if (!chatBoxRef.current) {
                  return;
                }
                setScrollTop(chatBoxRef.current.scrollTop);
                // chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
                // console.log({
                //   scrollTop: chatBoxRef.current.scrollTop,
                //   scrollHeight: chatBoxRef.current.scrollHeight,
                // });
              }}
            >
              {dialogList.map((dialog) => {
                if (
                  dialog.type === "bot_answer" ||
                  dialog.type === "bot_question"
                ) {
                  return <BotChat key={dialog.id} chat={dialog.sentence} />;
                }

                return <UserChat key={dialog.id} chat={dialog.sentence} />;
              })}
              <span className="hidden">{inputValue}</span>
            </div>
            {showScrollDown && (
              <div
                onClick={() => {
                  if (!chatBoxRef.current) {
                    return;
                  }
                  chatBoxRef.current.scrollTop =
                    chatBoxRef.current.scrollHeight;
                }}
                className="w-[90%] left-[5%] top-[470px] absolute text-center text-sm rounded-lg bg-slate-700 p-1"
              >
                ᐯ
              </div>
            )}
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
