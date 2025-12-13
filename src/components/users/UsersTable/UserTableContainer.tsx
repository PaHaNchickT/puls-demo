import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { UserTableView } from "./UserTableView";
import { ModalState } from "@/types/usersTable";
import { closeModal } from "./modalFactories";

export const UserTableContainer = () => {
  const users = useUserStore((state) => state.users);

  const deleteUser = useUserStore((store) => store.deleteUser);
  const getUserById = useUserStore((store) => store.getUserById);

  const [modalState, setModalState] = useState<ModalState>(closeModal());

  return (
    <UserTableView
      users={users}
      modalState={modalState}
      setModalState={setModalState}
      deleteUser={deleteUser}
      getUserById={getUserById}
    />
  );
};
