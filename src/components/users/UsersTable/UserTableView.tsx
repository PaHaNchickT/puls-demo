import { useCallback } from "react";

import { Modal } from "@/components/ui/Modal";
import { UserFormContainer } from "../UserForm/UserFormContainer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button, Paper, TableContainer } from "@mui/material";

import { UserTableBodyRow } from "./UserTableBodyRow";
import { UserTableHead } from "./UserTableHead";
import { UserTableEmpty } from "./UserTableEmpty";

import { User } from "@/types/user";
import { ModalState } from "@/types/usersTable";
import { UserTableConfirm } from "./UserTableConfirm";
import { openCreateModal } from "./factories/openCreateModal";
import { closeModal } from "./factories/closeModal";

type UserTableViewProps = {
  users: User[];
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  addUser: (u: User) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string | null) => User | null;
};

export const UserTableView = ({
  users,
  modalState,
  setModalState,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
}: UserTableViewProps) => {
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
          <UserTableHead />
          <TableBody>
            {users.length ? (
              users.map((user) => (
                <UserTableBodyRow
                  key={user.id}
                  user={user}
                  setModalState={setModalState}
                  deleteUser={deleteUser}
                  getUserById={getUserById}
                />
              ))
            ) : (
              <UserTableEmpty />
            )}
          </TableBody>
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
            handleCancel={handleModalClose}
            modalState={modalState}
            deleteUser={deleteUser}
            getUserById={getUserById}
          />
        )}
      </Modal>
    </div>
  );
};
