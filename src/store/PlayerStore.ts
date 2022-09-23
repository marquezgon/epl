import create from 'zustand';
import { PlayerData } from '../utils/types';

interface PlayerState {
  selectedPlayer: PlayerData | null,
  updateSelectedPlayer: (selectedPlayer: PlayerData | null) => void,
}

const usePlayerStore = create<PlayerState>()((set) => ({
  selectedPlayer: null,
  updateSelectedPlayer: (selectedPlayer) => set(() => ({ selectedPlayer })),
}))

export default usePlayerStore;