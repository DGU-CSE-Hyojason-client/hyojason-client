import { requester } from ".";
import { ROLE } from "../types";
import { apiUrl } from "./match";

export const login = async ({
  id,
  password,
  name,
  role,
}: {
  id: string;
  password: string;
  name: string;
  role: string;
}) => {
  try {
    const res = await requester("post", apiUrl() + "/auth/login", {
      id,
      password,
      name,
      role,
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    return data.role || ROLE.ADMIN;
  } catch (e) {
    console.log("login error" + e);
  }
};
