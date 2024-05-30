import { requester } from ".";
import { apiUrl } from "./match";

export type Dialog = {
  id: number;
  insertDate: string;
  type: "bot_answer" | "bot_question" | "user_answer" | "user_question";
  sentence: string;
  bundleId: number;
};

export const getDialogList = async (): Promise<Dialog[] | null> => {
  try {
    const res = requester("get", apiUrl() + "/api/chat/dialogList", {});
    return (await res).json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getReply = async (question: string): Promise<string | null> => {
  try {
    const res = requester("post", apiUrl() + "/api/chatbot/reply", {
      question,
    });
    return (await res).json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
