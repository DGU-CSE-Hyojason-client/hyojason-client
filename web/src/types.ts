export type User = {
  id: string;
  name: string;
};

export type Account = {
  id: string;
  name: string;
  role: ROLE;
};

export type Match = {
  memberNum: number;
  keyword: string[];
  users: User[];
};

export const ROLE = {
  elder: "elder",
  dolbomi: "dolbomi",
} as const;

export type ROLE = keyof typeof ROLE;
