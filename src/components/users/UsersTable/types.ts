export type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit" | null;
  editingUserId: string | null;
};
