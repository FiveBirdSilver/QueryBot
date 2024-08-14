import { create } from "zustand";

interface OpenType {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const useOpen = create<OpenType>((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ open: !state.open })),
}));

export default useOpen;
