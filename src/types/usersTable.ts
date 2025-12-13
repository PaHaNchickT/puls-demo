export type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | "delete" | null;
  editingUserId: string | null;
  innerText: string;
};