import create from 'zustand'
import { UserData } from '../utils/types';

interface UserState {
  user: UserData | null,
  updateUser: (user: UserData) => void
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
}))

export default useUserStore;