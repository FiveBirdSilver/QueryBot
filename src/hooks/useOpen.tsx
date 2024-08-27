import { create } from 'zustand'

interface OpenProps {
  open: boolean
  setOpen: (state: boolean) => void
  condition: 'basic' | 'wide'
  setCondition: (state: 'basic' | 'wide') => void
}

const useOpen = create<OpenProps>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  condition: 'basic',
  setCondition: (condition) => set({ condition }),
}))

export default useOpen
