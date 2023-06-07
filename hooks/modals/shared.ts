import { create } from 'zustand';

export interface GenericModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}