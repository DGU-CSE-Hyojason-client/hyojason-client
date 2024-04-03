import { HttpResponse, http } from "msw";
import { token } from "../config";

type User = { id: string; name: string };

interface Match {
  maxUserSize: number;
  users: User[];
}

const defaultMaxUserSize = 5;

export class MockMatchingQueue {
  queue: Map<string, Match>;
  token: string;

  constructor(token: string) {
    this.queue = new Map();
    this.token = token;
  }

  async add(gid: string, user: User) {
    const match = this.queue.get(gid);
    if (match) {
      match.users.push(user);
    } else {
      this.queue.set(gid, { maxUserSize: defaultMaxUserSize, users: [user] });
    }

    await this.dispatch();
  }

  users(gid: string) {
    return this.queue.get(gid)?.users || [];
  }

  maxUserSize(gid: string) {
    return this.queue.get(gid)?.maxUserSize || defaultMaxUserSize;
  }

  async dispatch() {
    for (const [gid, match] of this.queue.entries()) {
      if (match.users.length >= match.maxUserSize) {
        console.log(`${gid} 매칭이 완료되었습니다,`);
        await sendPushNotification(this.token, "");
      }
    }
  }
}

const matchingQueue = new MockMatchingQueue(token);

const getMatch = http.get<{ gid: string }>(
  "/match/:gid",
  async ({ params }) => {
    const { gid } = params;
    const users = matchingQueue.users(gid);
    const maxUserSize = matchingQueue.maxUserSize(gid);

    return HttpResponse.json({ gid, users, maxUserSize }, { status: 200 });
  }
);

const postMatch = http.post<{ gid: string }, { id: string; name: string }>(
  "/match/:gid",
  async ({ params, request }) => {
    const { gid } = params;
    const user = await request.json();
    const { id, name } = user;

    await matchingQueue.add(gid, user);
    const users = matchingQueue.users(gid);
    const maxUserSize = matchingQueue.maxUserSize(gid);

    return HttpResponse.json(
      { gid, id, name, users, maxUserSize },
      { status: 200 }
    );
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

export { getMatch, postMatch };
