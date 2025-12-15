import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { User, UserRole } from "@/types/user";
import { TableState } from "@/types/tableCommon";

type UserTableFiltersProps = {
  tableState: TableState<User>;
  setTableState: (state: TableState<User>) => void;
};

export const UserTableFilters = ({
  tableState,
  setTableState,
}: UserTableFiltersProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as UserRole | "";
    setTableState({ ...tableState, filter: value, page: 0 });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="role-filter-label">Роль</InputLabel>
      <Select
        labelId="role-filter-label"
        value={tableState.filter}
        label="Роль"
        onChange={handleChange}
      >
        <MenuItem value="">Все</MenuItem>
        <MenuItem value="Admin">Администратор</MenuItem>
        <MenuItem value="Manager">Менеджер</MenuItem>
        <MenuItem value="User">Пользователь</MenuItem>
      </Select>
    </FormControl>
  );
};
