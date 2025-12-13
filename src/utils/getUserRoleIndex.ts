import { USER_ROLE_MAPPING } from "@/constants/users";
import { User } from "@/types/user";

export const getUserRoleIndex = (user: User) =>
  Object.keys(USER_ROLE_MAPPING).indexOf(user.role);
