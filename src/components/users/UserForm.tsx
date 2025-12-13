import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useUserStore } from "@/store/userStore";
import { userSchema, UserFormData } from "@/schemas/user";
import { UserRole } from "@/types/user";
import { getPotentialSubordinates } from "@/utils/getPotentialSubordinates";

type UserFormCreateProps = { mode: "create"; onSave: () => void };
type UserFormEditProps = { mode: "edit"; userId: string; onSave: () => void };

export const UserForm = (props: UserFormCreateProps | UserFormEditProps) => {
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);

  const currentUser =
    props.mode === "edit" ? users.find((u) => u.id === props.userId) : null;

  const defaultValues: UserFormData = {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    role: currentUser?.role || "User",
    subordinates: currentUser?.subordinates || [],
  };

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

  const potentialSubordinates = getPotentialSubordinates(users, currentUser);

  const onSubmit = (data: UserFormData) => {
    if (props.mode === "create") {
      const id = nanoid();
      addUser({ id, managerId: null, ...data });

      data.subordinates.forEach((subId) => {
        const u = users.find((user) => user.id === subId);
        if (u) updateUser(subId, { ...u, managerId: id });
      });
    } else if (props.mode === "edit" && currentUser) {
      updateUser(currentUser.id, { ...currentUser, ...data });

      users.forEach((u) => {
        if (
          u.managerId === currentUser.id &&
          !data.subordinates.includes(u.id)
        ) {
          updateUser(u.id, { ...u, managerId: null });
        }
      });

      data.subordinates.forEach((subId) => {
        const u = users.find((user) => user.id === subId);
        if (u) updateUser(subId, { ...u, managerId: currentUser.id });
      });
    }

    props.onSave();
  };

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

          <TextField
            select
            label="Роль"
            value={selectedRole}
            onChange={(e) => setValue("role", e.target.value as UserRole)}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            <MenuItem value="Admin">Администратор</MenuItem>
            <MenuItem value="Manager">Менеджер</MenuItem>
            <MenuItem value="User">Пользователь</MenuItem>
          </TextField>

          <div className="w-full relative">
            <InputLabel
              id="subordinates"
              sx={{ padding: "0 5px", backgroundColor: "white", left: "-5px" }}
            >
              Подчинённые
            </InputLabel>
            <Select
              id="subordinates"
              multiple
              value={selectedSubordinates}
              onChange={(e) =>
                setValue("subordinates", e.target.value as string[])
              }
              renderValue={(selected) =>
                users
                  .filter((u) => selected.includes(u.id))
                  .map((u) => u.name)
                  .join(", ")
              }
              className="w-full"
            >
              {potentialSubordinates.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  <Checkbox checked={selectedSubordinates.includes(u.id)} />
                  <ListItemText primary={u.name} />
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="w-full flex gap-4">
            <Button
              onClick={props.onSave}
              variant="contained"
              color="secondary"
              className="grow"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="grow"
            >
              {props.mode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </div>
        </FormGroup>
      </FormControl>
    </form>
  );
};
