import { NoteModalProps } from "./NoteModal";
import { PhotoAlbumModalProps } from "./PhotoAlbumModal";

export interface ModalRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export type ModalTypes = "NotePad" | "PhotoAlbum";

export type ModalPropsMap = {
  NotePad: NoteModalProps;
  PhotoAlbum: PhotoAlbumModalProps;
};

export type ModalProps<T extends ModalTypes> = T extends keyof ModalPropsMap
  ? ModalPropsMap[T]
  : never;
