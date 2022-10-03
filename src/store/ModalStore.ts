import create from 'zustand'
import { ToastData } from '../utils/types';

interface ModalState {
  showOnboarding: boolean;
  updateShowOnboarding: (status: boolean) => void;
  showPlayerDrawer: boolean;
  updateShowPlayerDrawer: (status: boolean) => void;
  toast: ToastData | null;
  addToast: (toast: ToastData) => void;
  removeToast: () => void;
}

const useModalStore = create<ModalState>()((set) => ({
  showOnboarding: false,
  updateShowOnboarding: (showOnboarding) => set(() => ({ showOnboarding })),
  showPlayerDrawer: false,
  updateShowPlayerDrawer: (showPlayerDrawer) => set(() => ({ showPlayerDrawer })),
  toast: null,
  addToast: (toast) => set(() => ({ toast })),
  removeToast: () => set(() => ({ toast: null })),
}));

export default useModalStore;