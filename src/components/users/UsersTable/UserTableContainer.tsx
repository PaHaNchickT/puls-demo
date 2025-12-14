import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { UserTableView } from "./UserTableView";
import { ModalState } from "@/types/usersTable";
import { closeModal } from "./factories/closeModal";
import { Loader } from "@/components/ui/Loader";

export const UserTableContainer = () => {
  const users = useUserStore((state) => state.users);

  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((store) => store.deleteUser);
  const getUserById = useUserStore((store) => store.getUserById);

  const [modalState, setModalState] = useState<ModalState>(closeModal());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <UserTableView
          users={users}
          modalState={modalState}
          setModalState={setModalState}
          addUser={addUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
          getUserById={getUserById}
        />
      )}
    </>
  );
};
