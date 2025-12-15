import { Button } from "@mui/material";
import { UserTableFilters } from "./UserTableFilters";
import { TableState } from "@/types/tableCommon";
import { User } from "@/types/user";
import { Dispatch, SetStateAction } from "react";

type UserTableToolbarProps = {
  handleCreateUser: () => void;
  tableState: TableState<User>;
  setTableState: Dispatch<SetStateAction<TableState<User>>>;
};

export const UserTableToolbar = ({
  handleCreateUser,
  tableState,
  setTableState,
}: UserTableToolbarProps) => (
  <div className="flex justify-between py-2">
    <Button
      variant="contained"
      color="primary"
      className="self-start h-[40px]"
      onClick={handleCreateUser}
    >
      Добавить Пользователя
    </Button>
    <UserTableFilters tableState={tableState} setTableState={setTableState} />
  </div>
);
