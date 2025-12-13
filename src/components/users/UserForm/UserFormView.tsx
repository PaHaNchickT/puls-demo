import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, FormControl, FormGroup } from "@mui/material";
import { nanoid } from "nanoid";
import { userSchema, UserFormData } from "@/schemas/user";
import { User } from "@/types/user";
import { UserFormRolesSelector } from "./UserFormRolesSelector";
import { UserFormRolesSubordinates } from "./UserFormRolesSubordinates";
import { ModalMode } from "@/types/usersTable";
import { UserFormActionButtons } from "./UserFormActionButtons";
import { useCallback } from "react";
import { updateManagerId } from "@/components/users/UserForm/helpers/updateManagerId";
import { resetManagerId } from "./helpers/resetManagerId";

type UserFormProps = {
  users: User[];
  currentUser?: User | null;
  mode: ModalMode;
  defaultValues: UserFormData;
  potentialSubordinates: User[];
  onSave: () => void;
  addUser: (u: User) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
};

export const UserFormView = ({
  users,
  currentUser,
  mode,
  defaultValues,
  potentialSubordinates,
  onSave,
  addUser,
  updateUser,
}: UserFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const selectedRole = useWatch({
    control,
    name: "role",
  });

  const selectedSubordinates = useWatch({
    control,
    name: "subordinates",
  });

  const onSubmit = useCallback(
    (data: UserFormData) => {
      if (mode === "create") {
        const id = nanoid();

        addUser({ id, managerId: null, ...data });
        updateManagerId(users, data, id, updateUser);
      } else if (mode === "edit" && currentUser) {
        updateUser(currentUser.id, { ...currentUser, ...data });

        resetManagerId(users, data, currentUser, updateUser);
        updateManagerId(users, data, currentUser.id, updateUser);
      }

      onSave();
    },
    [addUser, currentUser, mode, onSave, updateUser, users]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <FormGroup sx={{ gap: 2 }}>
          <TextField
            label="Имя"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Телефон"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <UserFormRolesSelector
            selectedRole={selectedRole}
            setValue={setValue}
            errors={errors}
          />

          <UserFormRolesSubordinates
            users={users}
            selectedSubordinates={selectedSubordinates}
            potentialSubordinates={potentialSubordinates}
            setValue={setValue}
          />

          <UserFormActionButtons mode={mode} onSave={onSave} />
        </FormGroup>
      </FormControl>
    </form>
  );
};
