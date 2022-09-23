import create from 'zustand'

interface ModalState {
  showOnboarding: boolean,
  updateShowOnboarding: (status: boolean) => void,
  showPlayerDrawer: boolean,
  updateShowPlayerDrawer: (status: boolean) => void,
}

const useModalStore = create<ModalState>()((set) => ({
  showOnboarding: false,
  updateShowOnboarding: (showOnboarding) => set(() => ({ showOnboarding })),
  showPlayerDrawer: false,
  updateShowPlayerDrawer: (showPlayerDrawer) => set(() => ({ showPlayerDrawer })),
}));

export default useModalStore;