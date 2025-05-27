import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
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

    const handleClose = () => {
      closeModal();
    };

    const handleSubmit = async () => {
      if (value === "") {
        alert("내용을 입력해주세요.");
      } else {
        try {
          const randomX = Math.random() * 10 - 5;
          const randomY = Math.random() * 16 - 8;
          const newNote = {
            position: [randomX, randomY],
            text: value,
          };

          const res = await fetch("/api/postit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
          });

          const result = await res.json();
          if (result.success) {
            if (result.data) {
              updateNotes(result.data);
              closeModal();
            }
          }
        } catch (err) {
          console.error("Error:", err);
        }
      }
    };

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
        {isOpen && (
          <>
            <div className="bg-[#7d7d7df7] h-[50%] w-[50%] p-10 relative rounded-md flex items-center flex-col">

                {/* Replaced Textarea with native textarea */}
                <label
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Example Room 님의 방명록
                </label>
                <textarea
                  style={{
                    minHeight: "280px",
                    resize: "vertical",
                    width: "100%",
                    padding: "1.25rem",
                    marginBottom: "0.5rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                  }}
                  placeholder={title}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    border: "1px solid #7d7d7d",
                    borderRadius: "0.375rem",
                    padding: "0.5rem 1.5rem",
                    background: "transparent",
                    color: "#222",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  등록
                </button>
              </div>
              <span
                className="material-symbols-outlined absolute right-3 top-3 cursor-pointer text-2xl"
                onClick={handleClose}
              >
                close
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
);

NoteModal.displayName = "NoteModal";

export default NoteModal;
