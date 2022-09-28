import create from 'zustand';
import { PlayerData } from '../utils/types';

interface PlayerState {
  selectedPlayer: PlayerData | null,
  updateSelectedPlayer: (selectedPlayer: PlayerData | null) => void,
  isSearch: boolean,
  updateIsSearch: (isSearch: boolean) => void,
}

const usePlayerStore = create<PlayerState>()((set) => ({
  selectedPlayer: null,
  updateSelectedPlayer: (selectedPlayer) => set(() => ({ selectedPlayer })),
  isSearch: false,
  updateIsSearch: (isSearch: boolean) => set(() => ({ isSearch })),
}))

export default usePlayerStore;