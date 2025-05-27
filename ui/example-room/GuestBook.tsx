import { PostIts } from "../../models/PostIt";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchData();
  }, [notes]);

  return (
    <>
      {state.view !== 4 ? (
        <>
          <Posit position={[2.2, -5, 0]} text={"RoomOf에 오신걸 환영합니다."} />
          <Posit
            position={[2, -2, 0]}
            text={"RoomOf는 가상 추모 공간 서비스입니다."}
          />
          <Posit
            position={[2.3, 1, 0]}
            text={"현재 보시는 것은 방명록 기능입니다."}
          />
          <Posit
            position={[1.8, 4, 0]}
            text={"공간을 찾은 사람들이 하고 싶은 말들을 남길 수 있습니다."}
          />
          <Posit position={[0, -5, 0]} text={"하고 싶은 말을 남겨주세요!"} />
          <Posit position={[0, -2, 0]} text={"하고 싶은 말을 남겨주세요!"} />
          <Posit position={[0, 2, 0]} text={"하고 싶은 말을 남겨주세요!"} />
        </>
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

// notes.map((el, idx) => {
//   return <Posit position={el.position} text={el.text} key={idx} />;
// })
