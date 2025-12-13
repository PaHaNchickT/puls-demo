export type ModalMode = "create" | "edit" | "delete" | null;

export type ModalState = {
  isOpen: boolean;
  mode: ModalMode;
  editingUserId: string | null;
  innerText: string;
};
