import { createContext, useContext, useReducer, ReactNode } from "react";

type LoadingState = {
  isLoading: boolean;
};

type LoadingAction = { type: "START_LOADING" } | { type: "STOP_LOADING" };

const loadingReducer = (
  loadingState: LoadingState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case "START_LOADING":
      return { isLoading: true };
    case "STOP_LOADING":
      return { isLoading: false };
    default:
      return loadingState;
  }
};

const LoadingContext = createContext<
  | {
      loadingState: LoadingState;
      loadingDispatch: React.Dispatch<LoadingAction>;
    }
  | undefined
>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingState, loadingDispatch] = useReducer(loadingReducer, {
    isLoading: false,
  });

  return (
    <LoadingContext.Provider value={{ loadingState, loadingDispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};
