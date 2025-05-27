import { FC, useEffect, useRef } from "react";
import { useModalContext } from "./modal.provider";
import { ModalRef, ModalTypes } from "./modal.type";
import NoteModal from "./NoteModal";
import PhotoAlbumModal from "./PhotoAlbumModal";

const MODAL_COMPONENT: Record<ModalTypes, FC<any>> = {
  NotePad: NoteModal,
  PhotoAlbum: PhotoAlbumModal,
};

export const ModalRenderer: FC = () => {
  const { state } = useModalContext();
  const modalRef = useRef<ModalRef>(null);

  const ModalComponents = MODAL_COMPONENT[state.modalType as ModalTypes];

  useEffect(() => {
    if (!state.isOpen || !state.modalType) {
      modalRef.current?.close();
    } else {
      modalRef.current?.open();
    }
  }, [state.isOpen, state.modalType, state.props]);

  if (!state.isOpen || !state.modalType) return null;

  return <ModalComponents ref={modalRef} {...state.props} />;
};
