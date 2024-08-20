import { create } from "zustand";

interface OpenType {
  open: boolean;
  setOpen: (state: boolean) => void;
  condition: "basic" | "wide";
  setCondition: (state: "basic" | "wide") => void;
}

const useOpen = create<OpenType>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  condition: "basic",
  setCondition: (condition) => set({ condition }),
}));

export default useOpen;
