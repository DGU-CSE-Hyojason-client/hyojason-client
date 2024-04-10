import { login, me } from "./account";
import { getMatch, postMatch } from "./match";

export const handlers = [login, me, getMatch, postMatch];
