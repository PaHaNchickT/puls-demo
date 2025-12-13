import { persist } from "zustand/middleware";
import { User } from "@/types/user";
import { create } from "zustand";
import { seedUsers } from "@/data/users";
import { DeleteCheckResult } from "@/types/store";

type UserState = {
  users: User[];
  loadInitial: () => void;
  addUser: (u: User) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  checkBeforeDeletion: (id: string) => DeleteCheckResult;
  deleteUser: (id: string) => void;
  getUserById: (id: string | null) => User | null;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      loadInitial: () => {
        if (get().users.length === 0) {
          set({ users: seedUsers });
        }
      },
      addUser: (u) => set((s) => ({ users: [u, ...s.users] })),
      updateUser: (id, patch) =>
        set((s) => ({
          users: s.users.map((user) =>
            user.id === id ? { ...user, ...patch } : user
          ),
        })),
      checkBeforeDeletion: (userId: string): DeleteCheckResult => {
        const users = get().users;
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
      },
      deleteUser: (userId: string) => {
        const users = get().users;

        const updatedUsers = users
          .filter((u) => u.id !== userId)
          .map((u) => (u.managerId === userId ? { ...u, managerId: null } : u));

        set({ users: updatedUsers });
      },
      getUserById: (id: string | null) =>
        get().users.find((u) => u.id === id) ?? null,
    }),
    { name: "users-storage" }
  )
);
