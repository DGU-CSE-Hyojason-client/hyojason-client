import { requester } from ".";
import { ROLE } from "../types";
import { apiUrl } from "./match";

export const login = async ({
  id,
  name,
  role,
}: {
  id: string;
  name: string;
  role: string;
}) => {
  try {
    const res = await requester("post", apiUrl() + "/auth/login", {
      id,
      name,
      role,
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    return data.role || ROLE.MASTER;
  } catch (e) {
    console.log("login error" + e);
  }
};
