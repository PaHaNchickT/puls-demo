import { TableCell, TableRow } from "@mui/material";

export const UserTableEmpty = () => (
  <TableRow>
    <TableCell colSpan={7} align="center">
      Пользователи не найдены
    </TableCell>
  </TableRow>
);
