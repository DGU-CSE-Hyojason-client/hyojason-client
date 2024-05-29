import { HttpResponse, http } from "msw";
import { Account, ROLE } from "../../types";
import { TOKEN_KEY } from "../../const";

export type MockAccount = Account & {
  token: string;
};

export const mockAccounts: MockAccount[] = [
  {
    id: "admin",
    name: "zxc123",
    password: "admin",
    role: ROLE.ADMIN,
    token: "NORMAL_zxc123",
  },
  {
    id: "zxc123",
    name: "zxc123",
    password: "zxc123",
    role: ROLE.NORMAL,
    token: "NORMAL_zxc123",
  },
];

const login = http.post<object, Account>("/auth/login", async ({ request }) => {
  const { id, password, name, role } = await request.json();
  const token = `${role}_${id}`;

  mockAccounts.push({
    id,
    password,
    name,
    role,
    token,
  });

  return HttpResponse.json(
    {},
    { headers: { "Set-Cookie": `access_token=${token}` }, status: 200 }
  );
});

const me = http.get("/auth/me", async ({ cookies }) => {
  const token = cookies[TOKEN_KEY];
  const account = mockAccounts.find((a) => a.token === token);

  return HttpResponse.json(account, { status: 200 });
});

export { login, me };
