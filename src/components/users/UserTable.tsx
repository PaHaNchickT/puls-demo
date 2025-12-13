import { FC } from "react";
import { useUserStore } from "../../store/userStore";

import { ActionButton } from "../ui/ActionButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { USER_ROLE_MAPPING } from "@/constants/users";

export const UserTable: FC = () => {
  const users = useUserStore((state) => state.users);

  return (
    <div className="overflow-auto">
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
              <TableCell align="center">
                {
                  <div className="flex gap-4">
                    <ActionButton>
                      <EditIcon />
                    </ActionButton>
                    <ActionButton>
                      <DeleteIcon />
                    </ActionButton>
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
