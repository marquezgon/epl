import create from 'zustand'

interface UserState {
  user: object | null,
  updateUser: (user: object) => void
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
}))

export default useUserStore;