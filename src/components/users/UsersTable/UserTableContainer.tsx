import { useUserStore } from "@/store/userStore";
import { useEffect, useMemo, useState } from "react";
import { UserTableView } from "./UserTableView";
import { ModalState } from "@/types/usersTable";
import { closeModal } from "./factories/closeModal";
import { Loader } from "@/components/ui/Loader";
import { TableState } from "@/types/tableCommon";
import { User } from "@/types/user";
import { TABLE_INIT_STATE } from "@/constants/table";
import { applyFilters } from "@/utils/table/applyFilters";
import { applySorting } from "@/utils/table/applySorting";
import { applyPagination } from "@/utils/table/applyPagination";

export const UserTableContainer = () => {
  const users = useUserStore((state) => state.users);

  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((store) => store.deleteUser);
  const getUserById = useUserStore((store) => store.getUserById);

  const [isLoading, setIsLoading] = useState(true);

  const [modalState, setModalState] = useState<ModalState>(closeModal());
  const [tableState, setTableState] =
    useState<TableState<User>>(TABLE_INIT_STATE);

  const processedUsers = useMemo(() => {
    let result = users;
    let total = 0;

    result = applyFilters(result, tableState.filters);

    result = applySorting(result, tableState.sortBy, tableState.sortDirection);
    total = result.length;

    result = applyPagination(result, tableState.page, tableState.pageSize);

    return { result, total };
  }, [users, tableState]);

  const handleSort = (column: keyof User) => {
    setTableState((prev) => {
      if (prev.sortBy === column) {
        return {
          ...prev,
          sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
        };
      }

      return {
        ...prev,
        sortBy: column,
        sortDirection: "asc",
      };
    });
  };

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
          processedUsers={processedUsers.result}
          total={processedUsers.total}
          modalState={modalState}
          setModalState={setModalState}
          tableState={tableState}
          setTableState={setTableState}
          handleSort={handleSort}
          addUser={addUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
          getUserById={getUserById}
        />
      )}
    </>
  );
};
