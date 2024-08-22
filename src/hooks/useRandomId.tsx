import { create } from "zustand";

interface IdType {
  id: string;
}

function generateRandomNumericId() {
  let randomId = "";
  for (let i = 0; i < 10; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomId += randomDigit;
  }
  return randomId;
}

const useRandomId = create<IdType>(() => ({
  id: generateRandomNumericId(),
}));

export default useRandomId;
