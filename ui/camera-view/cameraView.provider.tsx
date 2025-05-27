import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type CameraViewState = {
  view: number;
  fix: boolean;
};

type CameraViewAction =
  | { type: "SET_VIEW"; payload: number }
  | { type: "TOGGLE_FIX" }
  | { type: "SET_FIX"; payload: boolean };

const initialState: CameraViewState = {
  view: 3,
  fix: false,
};

export const CameraViewContext = createContext<{
  state: CameraViewState;
  dispatch: Dispatch<CameraViewAction>;
}>({ state: initialState, dispatch: () => undefined });

const cameraViewReducer = (
  state: CameraViewState,
  action: CameraViewAction
): CameraViewState => {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_FIX":
      return { ...state, fix: action.payload };
    case "TOGGLE_FIX":
      return { ...state, fix: !state.fix };
  }
  throw new Error("[ERROR] unknown action type");
};

export const CameraViewProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cameraViewReducer, initialState);

  return (
    <CameraViewContext.Provider value={{ state, dispatch }}>
      {children}
    </CameraViewContext.Provider>
  );
};

export const useCameraViewState = () => {
  const context = useContext(CameraViewContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a StateProvider");
  }
  return context;
};
