export type User = {
  id: string;
  name: string;
};

export type Account = {
  id: string;
  name: string;
  role: "dolbomi" | "elder";
};

export type Match = {
  maxUserSize: number;
  users: User[];
};
