import { UserFormData } from "@/schemas/user";
import { User } from "@/types/user";

export const updateManagerId = (
  users: User[],
  userData: UserFormData,
  userId: string,
  updateUser: (id: string, patch: Partial<User>) => void
) => {
  userData.subordinates.forEach((subId) => {
    const subUser = users.find((user) => user.id === subId);

    if (subUser) updateUser(subId, { ...subUser, managerId: userId });
  });
};
