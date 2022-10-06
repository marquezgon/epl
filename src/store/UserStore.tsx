import produce from 'immer';
import create from 'zustand';
import { UserData } from '../utils/types';

interface UserState {
  user: UserData | null;
  updateUser: (user: UserData) => void;
  updateBudget: (budget: number) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
  updateBudget: (budget) => set(produce((state) => { state.user.budget = budget }))
}));

export default useUserStore;