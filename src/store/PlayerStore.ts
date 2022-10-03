import create from 'zustand';
import { PlayerData } from '../utils/types';

interface PlayerState {
  selectedPlayer: PlayerData | null,
  updateSelectedPlayer: (selectedPlayer: PlayerData | null) => void,
  searchValue: string;
  updateSearchValue: (searchValue: string) => void,
}

const usePlayerStore = create<PlayerState>()((set) => ({
  selectedPlayer: null,
  updateSelectedPlayer: (selectedPlayer) => set(() => ({ selectedPlayer })),
  searchValue: '',
  updateSearchValue: (searchValue: string) => set(() => ({ searchValue })),
}))

export default usePlayerStore;