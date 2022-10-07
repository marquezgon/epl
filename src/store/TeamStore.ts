import create from 'zustand';
import { BasicUserData } from '../utils/types';

interface TeamState {
  teams: Map<string, string>;
  updateTeams: (teams: BasicUserData[]) => void;
}

const useUserStore = create<TeamState>((set, get) => ({
  teams: new Map(),
  updateTeams: (teams: BasicUserData[]) => {
    set((state) => {
      const updatedTeams = new Map(state.teams);
      teams.forEach((team) => { updatedTeams.set(team.id, team.name) });
      return { teams: updatedTeams }
    });
    // this prints the latest state
    console.log(get().teams)
  },
}));

export default useUserStore;