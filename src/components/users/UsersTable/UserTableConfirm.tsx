import { User } from "@/types/user";
import { ModalState } from "@/types/usersTable";
import { Button } from "@mui/material";

type UserTableConfirm = {
  handleCancel: () => void;
  modalState: ModalState;
  deleteUser: (id: string) => void;
  getUserById: (id: string | null) => User | null;
};

export const UserTableConfirm = ({
  handleCancel,
  modalState,
  deleteUser,
  getUserById,
}: UserTableConfirm) => {
  const handleConfirm = () => {
    if (!modalState.editingUserId) return;

    deleteUser(modalState.editingUserId);
    handleCancel();
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
