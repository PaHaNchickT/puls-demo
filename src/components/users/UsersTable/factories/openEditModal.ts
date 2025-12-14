import { ModalState } from "@/types/usersTable";

export const openEditModal = (id: string): ModalState => ({
  isOpen: true,
  mode: "edit",
  editingUserId: id,
  innerText: "",
});
