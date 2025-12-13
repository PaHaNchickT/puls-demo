import { UserFormData } from "@/schemas/user";
import { UserRole } from "@/types/user";
import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

type UserFormRolesSelectorProps = {
  selectedRole: UserRole;
  setValue: UseFormSetValue<UserFormData>;
  errors: FieldErrors<UserFormData>;
};

export const UserFormRolesSelector = ({
  selectedRole,
  setValue,
  errors,
}: UserFormRolesSelectorProps) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setValue("role", event.target.value as UserRole),
    [setValue]
  );

  return (
    <TextField
      select
      label="Роль"
      value={selectedRole}
      onChange={handleChange}
      error={!!errors.role}
      helperText={errors.role?.message}
    >
      <MenuItem value="Admin">Администратор</MenuItem>
      <MenuItem value="Manager">Менеджер</MenuItem>
      <MenuItem value="User">Пользователь</MenuItem>
    </TextField>
  );
};
