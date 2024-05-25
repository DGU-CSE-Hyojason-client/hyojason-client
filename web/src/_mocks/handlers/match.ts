import { HttpResponse, http } from "msw";
import { token } from "../config";
import initialQueue from "../initialQueue.json";
import initialMatch from "../initialMatch.json";
import { Match, ROLE, User } from "../../types";
import { TOKEN_KEY } from "../../const";
import { mockAccounts } from "./account";
import { matchUri } from "../../apis/match";

const Matched: { [gid: string]: Match } = initialMatch;

export class MockMatchingQueue {
  queue: User[];
  token: string;

  constructor(token: string) {
    this.queue = initialQueue;
    this.token = token;
  }

  async add(user: User) {
    this.queue.push(user);
  }

  users() {
    return this.queue;
  }

  async match() {}
}

const matchingQueue = new MockMatchingQueue(token);

const getElderGroupStatus = http.get(
  matchUri.getElderGroupStatus,
  async ({ cookies }) => {
    const token = cookies[TOKEN_KEY];
    const account = mockAccounts.find((a) => a.token === token);

    if (!account) {
      return HttpResponse.json({}, { status: 403 });
    }

    if (account.role === ROLE.NORMAL) {
      const matched = Object.entries(Matched);
      for (const [gid, { users }] of matched) {
        if (users.find((u) => u.id === account.id)) {
          return HttpResponse.json(
            { status: "finish", groupId: gid },
            { status: 200 }
          );
        }
      }

      const users = matchingQueue.users();
      const found = users.find((user) => user.id === account.id);

      if (found) {
        return HttpResponse.json({ status: "ongoing" }, { status: 200 });
      }

      return HttpResponse.json({ status: "idle" }, { status: 200 });
    }

    return HttpResponse.json({}, { status: 400 });
  }
);

const getCaregiverGroupStatus = http.get(
  matchUri.getCaregiverGroupStatus,
  async ({ cookies }) => {
    const token = cookies[TOKEN_KEY];
    const account = mockAccounts.find((a) => a.token === token);

    if (!account) {
      return HttpResponse.json({}, { status: 403 });
    }

    if (account.role === ROLE.MASTER) {
      const users = matchingQueue.users();
      const matched = Object.entries(Matched).map(([k, v]) => ({
        ...v,
        groupId: k,
      }));

      console.log(matched);
      return HttpResponse.json({ groupList: matched, users }, { status: 200 });
    }
  }
);

const postElderGroupApply = http.post(
  matchUri.postElderGroupApply,
  async ({ cookies }) => {
    const token = cookies[TOKEN_KEY];
    const account = mockAccounts.find((a) => a.token === token);

    if (!account) {
      return HttpResponse.json({}, { status: 403 });
    }

    await matchingQueue.add({ id: account.id, name: account.name });

    return HttpResponse.json({}, { status: 200 });
  }
);

const getGroupDetail = http.get(
  matchUri.getGroupDetail,
  async ({ params, cookies }) => {
    const token = cookies[TOKEN_KEY];
    const account = mockAccounts.find((a) => a.token === token);

    if (!account) {
      return HttpResponse.json({}, { status: 403 });
    }

    console.log({ params });

    const groupId = params["groupId"] as string;

    if (Matched[groupId]) {
      const userList = Matched[groupId].users;
      return HttpResponse.json({ userList }, { status: 200 });
    }

    return HttpResponse.json({}, { status: 400 });
  }
);

async function sendPushNotification(
  expoPushToken: string,
  uri = "https://exp.host"
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "매칭이 완료되었습니다!",
    body: "",
    data: {},
  };

  const res = await fetch(`${uri}/api/v2/push/send`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  console.log(await res.json());
}

export { sendPushNotification };

export default [
  getElderGroupStatus,
  postElderGroupApply,
  getCaregiverGroupStatus,
  getGroupDetail,
] as const;
