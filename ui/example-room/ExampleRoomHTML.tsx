import { useEffect, useState } from "react";
import { useCameraViewState } from "../../ui/camera-view/cameraView.provider";
import RoomButtons from "./RoomButtons";
import useMousePosition from "../../util/custom-hook/use-mouse-position";

export default function ExampleRoomHTML() {
  const { ratio } = useMousePosition();
  const { state, dispatch } = useCameraViewState();

  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const clickLeft = () => {
    dispatch({
      type: "SET_VIEW",
      payload: state.view - 1 == -1 ? 2 : state.view - 1,
    });
  };
  const clickRight = () =>
    dispatch({ type: "SET_VIEW", payload: (state.view + 1) % 3 });

  const clickExit = () => {
    dispatch({ type: "SET_VIEW", payload: 2 });
    dispatch({ type: "TOGGLE_FIX" });
  };

  useEffect(() => {
    if (ratio) {
      if (ratio < 0.2) {
        setLeftVisible(true);
      } else if (ratio > 0.8) {
        setRightVisible(true);
      } else {
        if (leftVisible || rightVisible) {
          setLeftVisible(false);
          setRightVisible(false);
        }
      }
    }
  }, [leftVisible, ratio, rightVisible]);

  return (
    <>
      {state.view < 3 && state.view !== 0 && (
        <RoomButtons onClick={clickLeft} isLeft={true} visible={leftVisible} />
      )}
      {state.view < 3 && state.view !== 2 && (
        <RoomButtons
          onClick={clickRight}
          isLeft={false}
          visible={rightVisible}
        />
      )}

      {state.view === 4 ? (
        <div className="absolute bottom-10 w-screen flex justify-center bg-transparent">
          <span
            onClick={clickExit}
            className="material-symbols-outlined text-5xl bg-[#5c5c5c3a] rounded-2xl hover:cursor-pointer hover:bg-[rgb(148,148,148)] transition-colors"
          >
            close
          </span>
        </div>
      ) : null}
    </>
  );
}
