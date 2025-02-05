import { NoteModalProps } from "./NoteModal";

export interface ModalRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export type ModalTypes = "NotePad";

export type ModalPropsMap = {
  NotePad: NoteModalProps;
};

export type ModalProps<T extends ModalTypes> = T extends keyof ModalPropsMap
  ? ModalPropsMap[T]
  : never;
