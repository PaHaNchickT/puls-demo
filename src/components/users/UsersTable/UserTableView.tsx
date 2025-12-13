import { useCallback } from "react";

import { Modal } from "@/components/ui/Modal";
import { UserForm } from "../UserForm";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button, Paper, TableContainer } from "@mui/material";

import { ModalState } from "./types";
import { UserTableBodyRow } from "./UserTableBodyRow";
import { User } from "@/types/user";
import { UserTableHead } from "./UserTableHead";
import { UserTableEmpty } from "./UserTableEmpty";

type UserTableViewProps = {
  users: User[];
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
};

export const UserTableView = ({
  users,
  modalState,
  setModalState,
}: UserTableViewProps) => {
  const handleCreateUser = useCallback(() => {
    setModalState({ isOpen: true, mode: "create", editingUserId: null });
  }, [setModalState]);

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, mode: null, editingUserId: null });
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
              users.map((user, index) => (
                <UserTableBodyRow
                  key={index}
                  user={user}
                  setModalState={setModalState}
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
          <UserForm mode="create" onSave={handleModalClose} />
        )}
        {modalState.mode === "edit" && modalState.editingUserId && (
          <UserForm
            mode="edit"
            userId={modalState.editingUserId}
            onSave={handleModalClose}
          />
        )}
      </Modal>
    </div>
  );
};
