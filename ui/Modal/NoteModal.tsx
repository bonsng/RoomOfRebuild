import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
} from "react";
import { ModalRef } from "./modal.type";
import { useModal } from "./modal.hook";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { PostIts } from "@/models/PostIt";
export type NoteModalProps = {
  title: string;
  setNotes: Dispatch<SetStateAction<PostIts[]>>;
};

const NoteModal = forwardRef<ModalRef, NoteModalProps>(
  ({ title, setNotes }, ref) => {
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
          const newNote = {
            position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
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
              setNotes((prev) => [...prev, result.data]);
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
              <Textarea
                classNames={{
                  base: "mb-2",
                  input: "resize-y min-h-[280px]",
                  inputWrapper: "p-5",
                }}
                disableAnimation
                disableAutosize
                label="Example Room 님의 방명록"
                labelPlacement="outside"
                placeholder={title}
                value={value}
                variant="flat"
                onValueChange={setValue}
              />
              <div className="">
                <Button
                  color="default"
                  variant="bordered"
                  onPress={handleSubmit}
                >
                  등록
                </Button>
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

export default NoteModal;
