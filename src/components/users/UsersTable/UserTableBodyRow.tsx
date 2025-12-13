import { memo, useCallback } from "react";

import { useUserStore } from "@/store/userStore";

import { ActionButton } from "@/components/ui/ActionButton";

import { TableCell, TableRow } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { USER_ROLE_MAPPING } from "@/constants/users";
import { User } from "@/types/user";
import { ModalState } from "./types";

type UserTableBodyRowProps = {
  user: User;
  setModalState: (data: ModalState) => void;
};

export const UserTableBodyRow = memo(
  ({ user, setModalState }: UserTableBodyRowProps) => {
    const deleteUser = useUserStore((state) => state.deleteUser);
    const getUserById = useUserStore((store) => store.getUserById);

    const handleEditUser = useCallback(
      (id: string) => {
        setModalState({ isOpen: true, mode: "edit", editingUserId: id });
      },
      [setModalState]
    );

    const handleDeleteUser = (id: string) => {
      deleteUser(id);
    };

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
              <ActionButton onClick={() => handleDeleteUser(user.id)}>
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
