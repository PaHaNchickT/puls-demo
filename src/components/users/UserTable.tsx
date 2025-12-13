import { useState } from "react";
import { useUserStore } from "../../store/userStore";

import { ActionButton } from "../ui/ActionButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { Button, TableRow } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { USER_ROLE_MAPPING } from "@/constants/users";
import { Modal } from "../ui/Modal";
import { UserForm } from "./UserForm";

type ModalMode = "create" | "edit" | null;

export const UserTable = () => {
  const users = useUserStore((state) => state.users);

  const deleteUser = useUserStore((state) => state.deleteUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // const handleModalOpen = () => setIsModalOpen(true);
  // const handleModalClose = () => setIsModalOpen(false);

  const handleCreateUser = () => {
    setModalMode("create");
    setEditingUserId(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (id: string) => {
    setModalMode("edit");
    setEditingUserId(id);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleSaveUser = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-auto flex flex-col gap-4">
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableCell-root": {
            fontSize: "16px",
          },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Имя</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Телефон</TableCell>
            <TableCell align="right">Роль</TableCell>
            <TableCell align="right">Начальник</TableCell>
            <TableCell
              align="center"
              sx={{
                width: "1px",
                whiteSpace: "nowrap",
              }}
            >
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">
                {USER_ROLE_MAPPING[user.role]}
              </TableCell>
              <TableCell align="right">
                {users.find((u) => u.id === user.managerId)?.name || "-"}
              </TableCell>
              <TableCell align="center">
                {
                  <div className="flex gap-4">
                    <ActionButton onClick={() => handleEditUser(user.id)}>
                      <EditIcon />
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </ActionButton>
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
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

      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        {modalMode === "create" && (
          <UserForm mode="create" onSave={handleSaveUser} />
        )}
        {modalMode === "edit" && editingUserId && (
          <UserForm
            mode="edit"
            userId={editingUserId}
            onSave={handleSaveUser}
          />
        )}
      </Modal>
    </div>
  );
};
