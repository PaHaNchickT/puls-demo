"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { UserTable } from "../components/users/UserTable";

export default function HomePage() {
  const loadInitial = useUserStore((s) => s.loadInitial);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return (
    <main className="grow p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Users CRUD</h1>

      <UserTable />
    </main>
  );
}
