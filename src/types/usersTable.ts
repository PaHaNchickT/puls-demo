export type ModalMode = "create" | "edit" | "delete" | null;

export type ModalStatus =
  | null
  | "ok"
  | "hasManager"
  | "hasSubordinates"
  | "hasBoth";

export type ModalState = {
  isOpen: boolean;
  mode: ModalMode;
  editingUserId: string | null;
  innerText: string;
};
