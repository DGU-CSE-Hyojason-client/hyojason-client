export type User = {
  id: string;
  name: string;
};

export type Account = {
  id: string;
  password: string;
  name: string;
  role: ROLE;
};

export type Match = {
  memberNum: number;
  keyword: string[];
  users: User[];
};

export const ROLE = {
  NORMAL: "NORMAL",
  ADMIN: "ADMIN",
} as const;

export type ROLE = keyof typeof ROLE;
