import create from 'zustand'

interface ModalState {
  showOnboarding: boolean,
  updateShowOnboarding: (status: boolean) => void
}

const useModalStore = create<ModalState>()((set) => ({
  showOnboarding: false,
  updateShowOnboarding: (showOnboarding) => set(() => ({ showOnboarding })),
}));

export default useModalStore;