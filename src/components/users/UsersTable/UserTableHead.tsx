import { TableCell, TableHead, TableRow } from "@mui/material";

export const UserTableHead = () => (
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
);
