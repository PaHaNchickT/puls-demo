"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { UserTable } from "../components/users/UserTable";
import Button from "@mui/material/Button";

export default function HomePage() {
  const loadInitial = useUserStore((s) => s.loadInitial);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return (
    <main className="grow p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Users CRUD</h1>
      <Button variant="contained" color="primary" className="m-4">
        test
      </Button>
      <UserTable />
    </main>
  );
}
