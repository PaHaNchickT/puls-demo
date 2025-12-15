import { TableState } from "@/types/tableCommon";
import { User } from "@/types/user";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

type UserTableHeadProps = {
  tableState: TableState<User>;
  handleSort: (name: keyof User) => void;
};

export const UserTableHead = ({
  tableState,
  handleSort,
}: UserTableHeadProps) => (
  <TableHead>
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell
        align="right"
        sortDirection={
          tableState.sortBy === "name" ? tableState.sortDirection : false
        }
      >
        <TableSortLabel
          active={tableState.sortBy === "name"}
          direction={tableState.sortDirection || "asc"}
          onClick={() => handleSort("name")}
        >
          Имя
        </TableSortLabel>
      </TableCell>
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
