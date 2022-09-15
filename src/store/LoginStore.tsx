import create from 'zustand'

interface LoginState {
  status: string,
  updateStatus: (status: string) => void
}

const useLoginStore = create<LoginState>()((set) => ({
  status: 'login',
  updateStatus: (status) => set(() => ({ status })),
}));

export default useLoginStore;