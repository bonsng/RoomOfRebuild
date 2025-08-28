import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { ModalRef } from "./modal.type";
import { useModal } from "./modal.hook";
import { PostIts } from "@/models/PostIt";
export type NoteModalProps = {
  title: string;
  updateNotes: (arg: PostIts) => void;
};

const NoteModal = forwardRef<ModalRef, NoteModalProps>(
  ({ title, updateNotes }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const { closeModal } = useModal("NotePad");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
      setIsOpen(false);
      setValue("");
      closeModal();
    };

    const handleSubmit = async () => {
      if (isSubmitting) return;
      if (value.trim() === "") {
        alert("내용을 입력해주세요.");
        return;
      }
      try {
        setIsSubmitting(true);
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 16 - 8;
        const newNote = {
          position: [randomX, randomY],
          text: value.trim(),
        };
        const res = await fetch("/api/postit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        });
        const result = await res.json();
        if (result.success && result.data) {
          updateNotes(result.data);
          handleClose();
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsSubmitting(false);
      }
    };

    useEffect(() => {
      if (!isOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

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

    return isOpen ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="relative w-[min(640px,92vw)] rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="닫기"
            className="absolute right-3 top-3 rounded-full p-1 text-neutral-600 transition hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-white"
            onClick={handleClose}
            type="button"
          >
            <span className="material-symbols-outlined text-2xl leading-none">
              close
            </span>
          </button>

          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title || "방명록"}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              예쁘고 따뜻한 한마디 남겨주세요 ✨
            </p>
          </div>

          <label htmlFor="note-textarea" className="sr-only">
            방명록 내용
          </label>
          <textarea
            id="note-textarea"
            className="h-64 w-full resize-y rounded-xl border border-neutral-200 bg-white/70 p-4 text-[15px] text-neutral-900 outline-none ring-0 transition placeholder:text-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            placeholder="메시지를 입력하세요..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={500}
          />

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              {value.length} / 500
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 active:scale-[0.99] dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
              >
                {isSubmitting ? "등록 중..." : "등록"}
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  },
);

NoteModal.displayName = "NoteModal";

export default NoteModal;
