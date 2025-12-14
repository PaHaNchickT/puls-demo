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
          updateUser(user.id, { ...user, managerId: newManager.id });
        } else {
          status = {
            status: "error",
            errorMsg:
              "Невозможно удалить пользователя, поскольку не удалось найти нового начальника его подчиненным. Назначьте одному из гипотетических руководителей более высокую роль и повторите попытку.",
          };
        }
      }
    });
  }

  return status;
};
