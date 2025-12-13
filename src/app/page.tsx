"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { UserTableContainer } from "@/components/users/UsersTable/UserTableContainer";

export default function HomePage() {
  const loadInitial = useUserStore((s) => s.loadInitial);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return (
    <main className="grow p-6">
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>
      <UserTableContainer />
    </main>
  );
}
