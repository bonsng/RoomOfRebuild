import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "./modal.type";
import { Image } from "@/util/data/images";
import { useModal } from "./modal.hook";

export type PhotoAlbumModalProps = {
  photos: Image[];
};

const PhotoAlbumModal = forwardRef<ModalRef, PhotoAlbumModalProps>(
  ({ photos }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { closeModal } = useModal("PhotoAlbum");

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
        console.log("opened");
      },
      close: () => {
        setIsOpen(false);
      },
      isOpen,
    }));

    return (
      <div
        onClick={(e) => {
          e.stopPropagation;
          closeModal();
        }}
        className="w-screen h-screen fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center"
      >
        {isOpen && <div>photo album</div>}
      </div>
    );
  }
);

export default PhotoAlbumModal;
