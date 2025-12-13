import { UserFormData } from "@/schemas/user";
import { User } from "@/types/user";

export const resetManagerId = (
  users: User[],
  userData: UserFormData,
  currentUser: User,
  updateUser: (id: string, patch: Partial<User>) => void
) => {
  users.forEach((user) => {
    if (
      user.managerId === currentUser.id &&
      !userData.subordinates.includes(user.id)
    ) {
      updateUser(user.id, { ...user, managerId: null });
    }
  });
};
