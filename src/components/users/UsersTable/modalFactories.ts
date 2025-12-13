import { ModalState } from "@/types/usersTable";

export const openCreateModal = (): ModalState => ({
  isOpen: true,
  mode: "create",
  editingUserId: null,
  innerText: "",
});

export const openEditModal = (id: string): ModalState => ({
  isOpen: true,
  mode: "edit",
  editingUserId: id,
  innerText: "",
});

export const openDeleteModal = (id: string, text: string): ModalState => ({
  isOpen: true,
  mode: "delete",
  editingUserId: id,
  innerText: text,
});

export const closeModal = (): ModalState => ({
  isOpen: false,
  mode: null,
  editingUserId: null,
  innerText: "",
});
