import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GET_MY_TEAM, LIST_TEAMS } from '../../utils/gql/queries';
import { useUserStore } from '../../store';
import PlayerCard, { CardSize } from '../../components/PlayerCard/PlayerCard';
import { PlayerData } from '../../utils/types';
import { black } from '../../utils/colors';

interface TeamItem {
  id: string;
  name: string;
}

const MyTeam = () => {
  const user = useUserStore((state) => state.user);
  const teamId = user?.id;
  const [selectedId, setSelectedId] = useState(teamId);
  console.log('selected', selectedId);
  const { loading, error, data } = useQuery(GET_MY_TEAM, { variables: { teamId: selectedId } });
  const teams = useQuery(LIST_TEAMS, { variables: { limit: 12 } });

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  if (loading || teams.loading) {
    return (
      <div>Loading</div>
    );
  }

  const { getPlayersByTeam } = data;

  const renderPlayers = getPlayersByTeam.map((player: PlayerData) => (
    <Box key={player.id} sx={{ p: 2 }}>
      <PlayerCard player={player} size={CardSize.SMALL} />
    </Box>
  ));

  const renderItems = teams.data.listTeams.items.map((item: TeamItem) => (
    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
  ));

  return (
    <Box sx={{ width: '100%', maxHeight: '100%', overflowY: 'scroll' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 4 }}>
          <Stack direction='row'>
            <Typography
              sx={{ flex: '5', color: black, }}
              variant="h4"
            >
              Equipos
            </Typography>
            <Select
              value={selectedId}
              displayEmpty
              onChange={(item: SelectChangeEvent) => setSelectedId(item.target.value)}
            >
              {renderItems}
            </Select>
          </Stack>
          <Stack direction='row' sx={{ pt: 3 }} flexWrap='wrap'>
            {renderPlayers}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyTeam;