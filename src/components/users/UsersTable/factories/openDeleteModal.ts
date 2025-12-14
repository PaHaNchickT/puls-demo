import { ModalState } from "@/types/usersTable";

export const openDeleteModal = (id: string, text: string): ModalState => ({
  isOpen: true,
  mode: "delete",
  editingUserId: id,
  innerText: text,
});
