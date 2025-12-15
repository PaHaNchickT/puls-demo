import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { Modal } from "@/components/ui/Modal";
import { UserFormContainer } from "../UserForm/UserFormContainer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button, Paper, TableContainer } from "@mui/material";

import { UserTableBodyRow } from "./UserTableBodyRow";
import { UserTableHead } from "./UserTableHead";
import { UserTableEmpty } from "./UserTableEmpty";

import { User } from "@/types/user";
import { ModalState, DeleteStatus } from "@/types/usersTable";
import { UserTableConfirm } from "./UserTableConfirm";
import { openCreateModal } from "./factories/openCreateModal";
import { closeModal } from "./factories/closeModal";
import { TableState } from "@/types/tableCommon";
import { UserTableFooter } from "./UserTableFooter";

type UserTableViewProps = {
  users: User[];
  processedUsers: User[];
  total: number;
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  tableState: TableState<User>;
  setTableState: Dispatch<SetStateAction<TableState<User>>>;
  handleSort: (name: keyof User) => void;
  addUser: (u: User) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string | null) => User | null;
};

export const UserTableView = ({
  users,
  processedUsers,
  total,
  modalState,
  setModalState,
  tableState,
  setTableState,
  handleSort,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
}: UserTableViewProps) => {
  const [deleteStatus, setDeleteStatus] = useState<DeleteStatus>({
    type: null,
    errorText: "",
  });

  const handleCreateUser = useCallback(() => {
    setModalState(openCreateModal());
  }, [setModalState]);

  const handleModalClose = useCallback(() => {
    setModalState(closeModal());
  }, [setModalState]);

  return (
    <div className="overflow-auto flex flex-col gap-4">
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            "& .MuiTableCell-root": {
              fontSize: "16px",
            },
          }}
          aria-label="simple table"
        >
          <UserTableHead tableState={tableState} handleSort={handleSort} />
          <TableBody>
            {processedUsers.length ? (
              processedUsers.map((user) => (
                <UserTableBodyRow
                  key={user.id}
                  user={user}
                  setDeleteStatus={setDeleteStatus}
                  setModalState={setModalState}
                  deleteUser={deleteUser}
                  getUserById={getUserById}
                />
              ))
            ) : (
              <UserTableEmpty />
            )}
          </TableBody>
          <UserTableFooter
            total={total}
            tableState={tableState}
            setTableState={setTableState}
          />
        </Table>
        <Button
          variant="contained"
          color="primary"
          className="self-start"
          onClick={handleCreateUser}
        >
          Создать Нового Пользователя
        </Button>
      </TableContainer>

      <Modal isOpen={modalState.isOpen} handleClose={handleModalClose}>
        {modalState.mode === "create" && (
          <UserFormContainer
            users={users}
            mode="create"
            onSave={handleModalClose}
            addUser={addUser}
            updateUser={updateUser}
          />
        )}
        {modalState.mode === "edit" && modalState.editingUserId && (
          <UserFormContainer
            users={users}
            mode="edit"
            userId={modalState.editingUserId}
            onSave={handleModalClose}
            addUser={addUser}
            updateUser={updateUser}
          />
        )}
        {modalState.mode === "delete" && (
          <UserTableConfirm
            users={users}
            deleteStatus={deleteStatus}
            modalState={modalState}
            handleCancel={handleModalClose}
            updateUser={updateUser}
            deleteUser={deleteUser}
            getUserById={getUserById}
          />
        )}
      </Modal>
    </div>
  );
};
