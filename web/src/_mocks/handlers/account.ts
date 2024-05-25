import { HttpResponse, http } from "msw";
import { Account, ROLE } from "../../types";
import { TOKEN_KEY } from "../../const";

export type MockAccount = Account & {
  token: string;
};

export const mockAccounts: MockAccount[] = [
  {
    id: "dolbomi1",
    name: "dolbomi1",
    role: ROLE.MASTER,
    token: "dolbomi1",
  },
  {
    id: "elder_me",
    name: "elder_me",
    role: ROLE.NORMAL,
    token: "elder_me",
  },
];

const login = http.post<object, Account>("/auth/login", async ({ request }) => {
  const { id, name, role } = await request.json();
  const token = `${role}_${id}`;

  mockAccounts.push({
    id,
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
