import { NOTIFY_TEXT } from "@/constants/notify";
import { User } from "@/types/user";
import { DeleteStatus } from "@/types/usersTable";
import { getUserRoleIndex } from "@/utils/getUserRoleIndex";

type updateHierarchyStatus = {
  status: "success" | "error";
  errorMsg?: string;
};

export const updateHierarchy = (
  deleteStatus: DeleteStatus,
  users: User[],
  currentUser: User | null,
  updateUser: (id: string, patch: Partial<User>) => void
): updateHierarchyStatus => {
  let status: updateHierarchyStatus = { status: "success" };

  const currentUserId = currentUser?.id;
  const reassignedSubordinates = new Map<string, string[]>();

  if (
    deleteStatus.type === "hasBoth" ||
    deleteStatus.type === "hasSubordinates"
  ) {
    users.forEach((user) => {
      if (currentUser?.subordinates.includes(user.id)) {
        const newManager = users.find(
          (candidate) =>
            candidate.id !== currentUserId &&
            getUserRoleIndex(candidate.role) < getUserRoleIndex(user.role) &&
            !currentUser.subordinates.includes(candidate.id)
        );

        if (newManager) {
          const existing = reassignedSubordinates.get(newManager.id) ?? [];
          reassignedSubordinates.set(newManager.id, [...existing, user.id]);

          updateUser(user.id, { ...user, managerId: newManager.id });
        } else {
          status = {
            status: "error",
            errorMsg: NOTIFY_TEXT.deleteFailure,
          };
        }
      }
    });

    reassignedSubordinates.forEach((subs, managerId) => {
      const manager = users.find((u) => u.id === managerId);
      if (!manager) return;

      updateUser(managerId, {
        ...manager,
        subordinates: [...manager.subordinates, ...subs],
      });
    });
  }

  return status;
};
