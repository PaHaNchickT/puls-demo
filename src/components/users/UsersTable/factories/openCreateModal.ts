import { ModalState } from "@/types/usersTable";

export const openCreateModal = (): ModalState => ({
  isOpen: true,
  mode: "create",
  editingUserId: null,
  innerText: "",
});
