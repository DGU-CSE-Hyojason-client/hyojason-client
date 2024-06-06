/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
import ElderSvg from "../assets/icons/elder.svg?react";
import BotSvg from "../assets/icons/bot.svg?react";
import useAccount from "../hooks/useAccount";
import { Dialog, askCustom, getDialogList, getReply } from "../apis/chat";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const initialText = "Initial Text";

export function ChatPage() {
  const { account } = useAccount();
  const [inputValue, setInputValue] = useState(initialText);
  const [chatCount, setChatCount] = useState(0);
  const [dialogList, setDialogList] = useState<Dialog[]>([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useNavigate();

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
  }, [chatBoxRef.current, dialogList]);

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

  function pushDialog(sentence: string, type: "assistant" | "user") {
    if (sentence.includes("**")) {
      onOpen();
      return;
    }

    if (type === "assistant") {
      //@ts-ignore
      window.ReactNativeWebView?.postMessage(sentence);
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
          sentence,
          type,
        },
      ];
    });
  }

  useEffect(() => {
    if (inputValue === initialText) {
      return;
    }

    pushDialog(inputValue, "user");

    getReply(inputValue)
      .then((answer) => {
        if (answer) {
          pushDialog(answer, "assistant");
        }
      })
      .catch((e) => {
        alert(e);
      });

    const t = setTimeout(() => {
      askCustom()
        .then((answer) => {
          if (answer) {
            pushDialog(answer, "assistant");
          }
        })
        .catch((e) => {
          alert(e);
        });
    }, 1000 * 25);

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

  return (
    <>
      <div className="container mx-auto py-4 px-2">
        <div className="max-w-lg mx-auto bg-[#f3eee8] rounded-lg shadow-lg">
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
                }}
              >
                {dialogList.map((dialog) => {
                  if (dialog.type === "assistant") {
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
                  className="w-[90%] left-[5%] top-[470px] absolute text-center text-sm rounded-lg bg-[#e5be8f] p-1"
                >
                  ᐯ
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="xs"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        {/* @ts-ignore */}
        <ModalContent>
          {/* @ts-ignore */}
          <ModalBody className="bg-[#fff] rounded-t-md text-center">
            <p>그룹핑 서비스를 이용하시겠어요?</p>
            <p>비슷한 관심사를 가진 분들을 </p>
            <p>만날 수 있겠네요!</p>
          </ModalBody>
          {/* @ts-ignore */}
          <ModalFooter className="bg-[#fff] rounded-b-md">
            {/* @ts-ignore */}
            <Button
              mr={3}
              backgroundColor="#e5be8f"
              onClick={() => {
                history("/matching");
              }}
            >
              네
            </Button>
            <Button onClick={onClose} backgroundColor="#f3eee8">
              아니요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function BotChat({ chat }: { chat: string }) {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10">
        <BotSvg className="w-10 h-10" />
      </div>
      <div className="ml-2 bg-[#fef9f7] rounded-lg p-2">
        <p className="text-lg text-slate-800">{chat}</p>
      </div>
    </div>
  );
}

function UserChat({ chat }: { chat: string }) {
  return (
    <div className="flex items-center justify-end">
      <div className="mr-2 bg-[#fef9f7] rounded-lg p-2">
        <p className="text-lg text-slate-800">{chat}</p>
      </div>
      <div className="w-10 h-10">
        <ElderSvg className="w-10 h-10" />
      </div>
    </div>
  );
}
