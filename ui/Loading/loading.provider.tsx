import { createContext, ReactNode, useContext, useState } from "react";

type LoadingType = {
  isLoading: boolean;
  startLoading: () => void;
  endLoading: () => void;
};

const LoadingContext = createContext<LoadingType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, endLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("[Error]: no such context!!");
  return context;
};
