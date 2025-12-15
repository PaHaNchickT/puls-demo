import { ModalState } from "@/types/usersTable";

export const closeModal = (): ModalState => ({
  isOpen: false,
  mode: null,
  editingUserId: null,
  innerText: "",
});
