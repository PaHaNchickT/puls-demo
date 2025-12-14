import { UserFormData } from "@/schemas/user";
import { User } from "@/types/user";
import { getUserRoleIndex } from "@/utils/getUserRoleIndex";

type updateHierarchyStatus = {
  status: "success" | "error";
  errorMsg?: string;
  managerId?: string | null;
};

export const updateHierarchy = (
  users: User[],
  userData: UserFormData,
  currentUser: User | null | undefined,
  updateUser: (id: string, patch: Partial<User>) => void
): updateHierarchyStatus => {
  let status: updateHierarchyStatus = { status: "success" };

  const newRole = userData.role;
  const newSubs = userData.subordinates;
  const currentUserId = currentUser?.id;

  const isRoleChanged = newRole !== currentUser?.role;
  const isSubsChanged =
    [...newSubs].sort().join(",") !==
    [...(currentUser?.subordinates ?? [])].sort().join(",");

  const subsDiff = userData.subordinates.filter(
    (item) => !currentUser?.subordinates.includes(item)
  );

  users.forEach((user) => {
    // SUBORDINATES CHECK
    if (isSubsChanged && user.id === currentUser?.managerId) {
      // У старого начальника убираем подчиненного, у которого теперь новый начальник
      updateUser(user.id, {
        ...user,
        subordinates: user.subordinates.filter((id) => !subsDiff.includes(id)),
      });

      // Если назначаем челу подчиненных, то у этих подчиненных нужно обновить managerId
      if (user.managerId !== currentUserId && newSubs.includes(user.id)) {
        updateUser(user.id, { ...user, managerId: currentUserId });
      }
    }

    // ROLE CHECK
    if (isRoleChanged) {
      const managerData = users.find(
        (userManager) => userManager.id === user.managerId
      );

      if (
        managerData &&
        getUserRoleIndex(managerData?.role) >= getUserRoleIndex(newRole) &&
        user.id === currentUserId
      ) {
        // Если чел-подчиненный прекращает быть по статусу младше начальника, то сбрасываем managerId у чела
        status = { status: "success", managerId: null };

        // Если чел-подчиненный прекращает быть по статусу младше начальника, то также чистим подчиненных у того начальника
        updateUser(managerData.id, {
          ...managerData,
          subordinates: managerData.subordinates.filter((id) => id !== user.id),
        });
      }

      if (
        getUserRoleIndex(newRole) >= getUserRoleIndex(user.role) &&
        user.id !== currentUserId &&
        newSubs.includes(user.id)
      ) {
        // Если начальник перестает быть по статусу выше подчиненного, то пытаемся найти подчиненному нового начальника
        const newManager = users.find(
          (candidate) =>
            candidate.id !== currentUserId &&
            getUserRoleIndex(candidate.role) < getUserRoleIndex(user.role) &&
            !userData.subordinates.includes(candidate.id)
        );

        // Если найти нового начальника не удается, то запрещаем изменение роли
        if (newManager) {
          updateUser(user.id, { ...user, managerId: newManager.id });
        } else {
          status = { status: "error", errorMsg: "" };
        }
      }
    }
  });

  return status;
};

// 3) Если удаляю пользователя, то нужно проверить наличие начальников и подчиненных.
// - Если есть начальник, то предупреждаем, но разрешаем удалить
// - Если есть подчиненные, то пытаемся найти нового начальника.
// - Если найти нового начальника получается, то мы применяем изменения, а если начальников больше нет, то мы запрещаем удаление
