import { TableState } from "@/types/tableCommon";
import { User } from "@/types/user";
import { TableFooter, TablePagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type UserTableFooterProps = {
  total: number;
  tableState: TableState<User>;
  setTableState: Dispatch<SetStateAction<TableState<User>>>;
};

export const UserTableFooter = ({
  total,
  tableState,
  setTableState,
}: UserTableFooterProps) => (
  <TableFooter>
    <TablePagination
      count={total}
      page={tableState.page}
      onPageChange={(_, page) => setTableState((state) => ({ ...state, page }))}
      rowsPerPage={tableState.pageSize}
      onRowsPerPageChange={(e) =>
        setTableState((state) => ({
          ...state,
          pageSize: Number(e.target.value),
          page: 0,
        }))
      }
    />
  </TableFooter>
);
