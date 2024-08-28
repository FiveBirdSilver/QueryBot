import { create } from 'zustand'

interface OpenProps {
  date: string
  setDate: (state: string) => void
}

const useDate = create<OpenProps>((set) => ({
  date: '',
  setDate: (date) => set({ date }),
}))

export default useDate
