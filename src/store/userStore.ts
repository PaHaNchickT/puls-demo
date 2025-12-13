import { persist } from "zustand/middleware";
import { User } from "@/types/user";
import { create } from "zustand";
import { seedUsers } from "@/data/users";

type UserState = {
  users: User[];
  loadInitial: () => void;
  addUser: (u: User) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
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
      deleteUser: (id) =>
        set((s) => ({ users: s.users.filter((u) => u.id !== id) })),
    }),
    { name: "users-storage" }
  )
);
