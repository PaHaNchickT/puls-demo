import { User } from "@/types/user";
import { ModalState, DeleteStatus } from "@/types/usersTable";
import { Button } from "@mui/material";
import { updateHierarchy } from "./helpers/updateHierarchy";
import { notify } from "@/utils/notify";
import { NOTIFY_TEXT } from "@/constants/notify";

type UserTableConfirm = {
  users: User[];
  deleteStatus: DeleteStatus;
  modalState: ModalState;
  handleCancel: () => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string | null) => User | null;
};

export const UserTableConfirm = ({
  users,
  deleteStatus,
  modalState,
  handleCancel,
  updateUser,
  deleteUser,
  getUserById,
}: UserTableConfirm) => {
  const handleConfirm = () => {
    if (!modalState.editingUserId) return;

    const result = updateHierarchy(
      deleteStatus,
      users,
      getUserById(modalState.editingUserId),
      updateUser
    );

    if (result.status === "success") {
      deleteUser(modalState.editingUserId);
      handleCancel();
      notify(NOTIFY_TEXT.deleteSuccess, "success");
    } else {
      notify(result.errorMsg || NOTIFY_TEXT.default, "error");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-xl font-bold text-center">
        Вы уверены, что хотите удалить пользователя?
      </h2>
      <p className="whitespace-pre-line">{`${
        getUserById(modalState.editingUserId)?.name || "Пользователь"
      } ${modalState.innerText}`}</p>
      <div className="flex gap-4">
        <Button
          onClick={handleCancel}
          variant="contained"
          color="secondary"
          className="grow"
        >
          Передумал
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          className="grow"
        >
          Сам решууу
        </Button>
      </div>
    </div>
  );
};
