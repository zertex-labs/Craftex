import { create } from "zustand";
import { GenericModalStore } from "./shared";
import { ViewType } from "@/components/modals";

interface AuthModalStore extends GenericModalStore {
  view: ViewType;
  setView: (view: ViewType) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),

  view: 'sign_in',
  setView: (view) => set({ view }),
}));
