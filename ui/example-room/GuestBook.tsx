import { PostIts } from "@/models/PostIt";
import { Suspense, useCallback, useEffect, useState } from "react";
import Posit from "./models/Postit";
import { useModal } from "../modal/modal.hook";
import NotePad from "./models/NotePad";
import ChalkBoard from "./models/ChalkBoard";
import { useCameraViewState } from "../camera-view/cameraView.provider";
import { Html } from "@react-three/drei";
import GuestPage from "./GuestPage";

export default function GuestBook() {
  const [notes, setNotes] = useState<PostIts[]>([]);
  const { state, dispatch } = useCameraViewState();
  const { openModal } = useModal("NotePad");
  const updateNotes = (data: PostIts) => {
    setNotes((prev) => [...prev, data]);
  };

  const handleBoardClick = () => {
    if (state.view !== 4) {
      dispatch({ type: "SET_VIEW", payload: 4 });
      dispatch({ type: "TOGGLE_FIX" });
    }
  };
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/postit");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNotes((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.notes)) {
          return data.notes;
        }
        return prev;
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {state.view !== 4 ? (
        <Suspense fallback={null}>
          {notes.map((note, idx) => (
            <Posit position={note.position} text={note.text} key={idx} />
          ))}
        </Suspense>
      ) : (
        <Html
          transform
          distanceFactor={5.5}
          position={[27.5, 14, 10.2]}
          rotation-y={-Math.PI * 0.5}
        >
          <GuestPage notes={notes} />
        </Html>
      )}

      <NotePad
        onClick={() =>
          openModal({ title: "전하고 싶은 말을 써주세요.", updateNotes })
        }
      />
      <ChalkBoard handleClick={handleBoardClick} />
    </>
  );
}
