import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { ModalState } from "./types";
import { UserTableView } from "./UserTableView";

export const UserTableContainer = () => {
  const users = useUserStore((state) => state.users);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: null,
    editingUserId: null,
  });

  return (
    <UserTableView
      users={users}
      modalState={modalState}
      setModalState={setModalState}
    />
  );
};
