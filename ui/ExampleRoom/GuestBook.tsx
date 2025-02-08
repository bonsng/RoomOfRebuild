import { PostIts } from "@/models/PostIt";
import { useEffect, useState } from "react";
import Posit from "./Models/Postit";
import { useModal } from "../Modal/modal.hook";
import NotePad from "./Models/NotePad";
import ChalkBoard from "./Models/ChalkBoard";
import { useCameraViewState } from "../CameraView/cameraView.provider";
import { Html } from "@react-three/drei";
import GuestPage from "./GuestPage";
import { useLoading } from "../Loading/loading.provider";

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
  }, [notes]);

  return (
    <>
      {state.view !== 4 ? (
        notes.map((el, idx) => {
          return <Posit position={el.position} text={el.text} key={idx} />;
        })
      ) : (
        <Html
          transform
          distanceFactor={5.5}
          position={[27.5, 14, 10.2]}
          rotation-y={-Math.PI * 0.5}
        >
          <GuestPage />
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
