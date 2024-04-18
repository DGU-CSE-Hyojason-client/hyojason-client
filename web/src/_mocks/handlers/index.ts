import { login, me } from "./account";
import matchApis from "./match";

export const handlers = [login, me, ...matchApis];
