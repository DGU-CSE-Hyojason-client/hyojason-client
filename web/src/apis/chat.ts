import { requester } from ".";
import { apiUrl } from "./match";

export type Dialog = {
  id: number;
  insertDate: string;
  type: "assistant" | "user";
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
    return (await res).text();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const askCustom = async (): Promise<string | null> => {
  try {
    const res = requester("get", apiUrl() + "/api/chatbot/ask/custom", {});
    return (await res).text();
  } catch (error) {
    console.log(error);
    return null;
  }
};
