import { create } from "zustand";
import { GenericModalStore } from "./shared";

export const useAuthModal = create<GenericModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
