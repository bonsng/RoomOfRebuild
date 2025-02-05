import { PostIts } from "@/models/PostIt";
import { useEffect, useState } from "react";
import Posit from "./Models/Postit";
import { useModal } from "../Modal/modal.hook";
import NotePad from "./Models/NotePad";

export default function GuestBook() {
  const [notes, setNotes] = useState<PostIts[]>([]);
  const { openModal } = useModal("NotePad");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/postit");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (JSON.stringify(notes) !== JSON.stringify(data.notes)) {
          setNotes(data.notes);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    console.log(notes);
  }, [notes]);

  return (
    <>
      {notes.map((el, idx) => {
        return <Posit position={el.position} key={idx} />;
      })}
      <NotePad
        onClick={() =>
          openModal({ title: "전하고 싶은 말을 써주세요.", setNotes })
        }
      />
    </>
  );
}
