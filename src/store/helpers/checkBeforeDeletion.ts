import { DeleteCheckResult } from "@/types/store";
import { User } from "@/types/user";

export const checkBeforeDeletion = (
  users: User[],
  userId: string
): DeleteCheckResult => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return { type: "ok" };
  }

  const subordinates = users.filter((u) => u.managerId === userId);

  const manager = user.managerId
    ? users.find((u) => u.id === user.managerId) ?? null
    : null;

  if (manager && subordinates.length > 0) {
    return {
      type: "hasBoth",
      manager,
      subordinates,
    };
  }

  if (subordinates.length > 0) {
    return {
      type: "hasSubordinates",
      subordinates,
    };
  }

  if (manager) {
    return {
      type: "hasManager",
      manager,
    };
  }

  return { type: "ok" };
};
