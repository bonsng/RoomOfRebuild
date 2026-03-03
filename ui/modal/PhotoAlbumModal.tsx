"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { ModalRef } from "./modal.type";
import { useModal } from "./modal.hook";
import { Image } from "@/util/data/images";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type PhotoAlbumModalProps = {
  photos: Image[];
};

const PhotoAlbumModal = forwardRef<ModalRef, PhotoAlbumModalProps>(
  ({ photos }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { closeModal } = useModal("PhotoAlbum");

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setSelectedIndex(null);
      closeModal();
    }, [closeModal]);

    const handlePrev = useCallback(() => {
      setSelectedIndex((prev) =>
        prev !== null ? (prev - 1 + photos.length) % photos.length : null
      );
    }, [photos.length]);

    const handleNext = useCallback(() => {
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % photos.length : null
      );
    }, [photos.length]);

    useEffect(() => {
      if (!isOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          if (selectedIndex !== null) {
            setSelectedIndex(null);
          } else {
            handleClose();
          }
        }
        if (selectedIndex !== null) {
          if (e.key === "ArrowLeft") handlePrev();
          if (e.key === "ArrowRight") handleNext();
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, selectedIndex, handleClose, handlePrev, handleNext]);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      isOpen,
    }));

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="relative max-h-[90vh] w-[min(900px,94vw)] overflow-y-auto rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="닫기"
            className="absolute right-3 top-3 z-10 rounded-full p-1 text-neutral-600 transition hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-white"
            onClick={handleClose}
            type="button"
          >
            <X size={24} />
          </button>

          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Photo Album
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                onClick={() => setSelectedIndex(idx)}
              >
                <img
                  src={photo.url}
                  alt={`Photo ${idx + 1}`}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              aria-label="닫기"
              className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition hover:text-white"
              onClick={() => setSelectedIndex(null)}
              type="button"
            >
              <X size={28} />
            </button>

            <button
              aria-label="이전"
              className="absolute left-4 rounded-full p-2 text-white/70 transition hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              type="button"
            >
              <ChevronLeft size={36} />
            </button>

            <img
              src={photos[selectedIndex].url}
              alt={`Photo ${selectedIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              aria-label="다음"
              className="absolute right-4 rounded-full p-2 text-white/70 transition hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              type="button"
            >
              <ChevronRight size={36} />
            </button>

            <div className="absolute bottom-4 text-sm text-white/60">
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PhotoAlbumModal.displayName = "PhotoAlbumModal";

export default PhotoAlbumModal;
