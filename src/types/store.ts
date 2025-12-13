import { User } from "./user";

export type DeleteCheckResult =
  | { type: "ok" }
  | { type: "hasManager"; manager: User }
  | { type: "hasSubordinates"; subordinates: User[] }
  | { type: "hasBoth"; manager: User; subordinates: User[] };
