import create from "zustand";
import { Setter } from "../../utils/types/types";
type Store = {
  url: string;
  setUrl: Setter<string>;
};

const useStore = create<Store>((set) => ({
  url: "",
  setUrl: (url: string) => set({ url }),
}));

export const useAnalyzeStore = () => {
  const store = useStore();
  return store;
};
