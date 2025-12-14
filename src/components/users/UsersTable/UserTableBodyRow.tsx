import { memo, useCallback } from "react";

import { useUserStore } from "@/store/userStore";

import { ActionButton } from "@/components/ui/ActionButton";

import { TableCell, TableRow } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { USER_DELETE_CONFIRM, USER_ROLE_MAPPING } from "@/constants/users";
import { User } from "@/types/user";
import { ModalState, ModalStatus } from "@/types/usersTable";
import { openDeleteModal } from "./factories/openDeleteModal";
import { openEditModal } from "./factories/openEditModal";

type UserTableBodyRowProps = {
  user: User;
  setDeleteStatus: (type: ModalStatus) => void;
  setModalState: (data: ModalState) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string | null) => User | null;
};

export const UserTableBodyRow = memo(
  ({
    user,
    setDeleteStatus,
    setModalState,
    deleteUser,
    getUserById,
  }: UserTableBodyRowProps) => {
    const checkBeforeDeletion = useUserStore(
      (store) => store.checkBeforeDeletion
    );

    const handleEditUser = useCallback(
      (id: string) => setModalState(openEditModal(id)),
      [setModalState]
    );

    const handleCheckBeforeDelete = useCallback(
      (id: string) => {
        const result = checkBeforeDeletion(id);

        if (result.type === "ok") {
          deleteUser(id);
        } else {
          setDeleteStatus(result.type);
          setModalState(openDeleteModal(id, USER_DELETE_CONFIRM[result.type]));
        }
      },
      [setDeleteStatus, setModalState, checkBeforeDeletion, deleteUser]
    );

    return (
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
        <TableCell align="right">{USER_ROLE_MAPPING[user.role]}</TableCell>
        <TableCell align="right">
          {getUserById(user.managerId)?.name ?? "-"}
        </TableCell>
        <TableCell align="center">
          {
            <div className="flex gap-4">
              <ActionButton onClick={() => handleEditUser(user.id)}>
                <EditIcon />
              </ActionButton>
              <ActionButton onClick={() => handleCheckBeforeDelete(user.id)}>
                <DeleteIcon />
              </ActionButton>
            </div>
          }
        </TableCell>
      </TableRow>
    );
  }
);

UserTableBodyRow.displayName = "UserTableBodyRow";
