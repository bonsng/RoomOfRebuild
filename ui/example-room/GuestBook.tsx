import { PostIts } from "@/models/PostIt";
import { Suspense, useState } from "react";
import Posit from "./models/Postit";
import { useModal } from "../modal/modal.hook";
import NotePad from "./models/NotePad";
import ChalkBoard from "./models/ChalkBoard";
import { useCameraViewState } from "../camera-view/cameraView.provider";
import { Html } from "@react-three/drei";
import GuestPage from "./GuestPage";
import { mockNotes } from "@/data/mockNotes";

export default function GuestBook() {
  const [notes, setNotes] = useState<PostIts[]>(mockNotes);
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
