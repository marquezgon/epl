import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { NumericFormat } from 'react-number-format';
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

interface PlayerMoneyInfo {
  value: number;
  wage: number;
}

const MyTeam = () => {
  const user = useUserStore((state) => state.user);
  const teamId = user?.id;
  const [selectedId, setSelectedId] = useState(teamId);

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
  
  const teamItems = teams.data.listTeams.items;
  const renderItems = teamItems.map((item: TeamItem) => (
    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
  ));
  const teamInfo = teamItems.find((item: TeamItem) => item.id === selectedId);
  const rosterValue = getPlayersByTeam.reduce((acc: PlayerMoneyInfo, player: PlayerData) => {
    return { value: acc.value + player.price, wage: acc.wage + player.wage };
  }, { value: 0, wage: 0 });

  return (
    <Box sx={{ width: '100%', maxHeight: '100%', overflowY: 'scroll' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 4 }}>
          <Stack direction='row' justifyContent='space-between'>
            <Box>
              <Typography
                sx={{ flex: '5', color: black, }}
                variant="h4"
              >
                {teamInfo.name}
              </Typography>
              <NumericFormat
                value={rosterValue.value}
                thousandSeparator=','
                displayType='text'
                renderText={(value) => (
                  <Typography sx={{ fontSize: '1.2rem', pt: 1.5 }}>
                    Valor de la plantilla: <b>${value}</b>
                  </Typography>
                )}
              />
              <NumericFormat
                value={rosterValue.wage}
                thousandSeparator=','
                displayType='text'
                renderText={(value) => (
                  <Typography sx={{ fontSize: '1.2rem' }}>
                    Salario de la plantilla (por partido): <b>${value}</b>
                  </Typography>
                )}
              />
            </Box>
            <Select
              sx={{ alignSelf: 'center' }}
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