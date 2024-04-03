import { HttpResponse, http } from "msw";
import { token } from "../config";

interface PostMatcingParams {
  gid: string;
}

interface PostMatchingReqBody {
  id: string;
  name: string;
}

type User = { id: string; name: string };

interface Match {
  maxUserSize: number;
  users: User[];
}

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
      //   this.queue.set(gid, users);
    } else {
      this.queue.set(gid, { maxUserSize: 5, users: [user] });
    }

    await this.dispatch();
  }

  users(gid: string) {
    return this.queue.get(gid)?.users;
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

const postMatch = http.post<PostMatcingParams, PostMatchingReqBody>(
  "/match/:gid",
  async ({ params, request }) => {
    const { gid } = params;
    const user = await request.json();
    const { id, name } = user;

    await matchingQueue.add(gid, user);
    const users = matchingQueue.users(gid);

    return HttpResponse.json({ gid, id, name, users }, { status: 200 });
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

export default postMatch;
