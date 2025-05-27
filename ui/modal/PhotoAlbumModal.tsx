"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "./modal.type";
import { useModal } from "./modal.hook";
import { Image } from "@/util/data/images";

export type PhotoAlbumModalProps = {
  photos: Image[];
};

const PhotoAlbumModal = forwardRef<ModalRef, PhotoAlbumModalProps>(
  ({ photos }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
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
      <div className="w-screen h-screen fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center">
        some modal
      </div>
    );
  }
);

PhotoAlbumModal.displayName = "PhotoAlbumModal";

export default PhotoAlbumModal;
