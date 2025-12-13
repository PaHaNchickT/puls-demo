import { User } from "@/types/user";
import { getUserRoleIndex } from "./getUserRoleIndex";

export const getPotentialSubordinates = (
  users: User[],
  currentUser?: User | null
) =>
  users.filter(
    (user) =>
      currentUser &&
      user.id !== currentUser?.id &&
      getUserRoleIndex(currentUser) < getUserRoleIndex(user)
  );
