import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GET_MY_TEAM } from '../../utils/gql/queries';
import { useUserStore } from '../../store';
import PlayerCard, { CardSize } from '../../components/PlayerCard/PlayerCard';
import { PlayerData } from '../../utils/types';
import { black } from '../../utils/colors';

const MyTeam = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  const { loading, error, data } = useQuery(GET_MY_TEAM, { variables: { teamId: user?.id } });

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  if (loading) {
    return (
      <div>Loading</div>
    );
  }

  const { getPlayersByTeam } = data;
  console.log(getPlayersByTeam);
  const renderPlayers = getPlayersByTeam.map((player: PlayerData) => (
    <Box key={player.id} sx={{ px: 2 }}>
      <PlayerCard player={player} size={CardSize.SMALL} />
    </Box>
  ));

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 4 }}>
          <Typography
            sx={{ flex: '5', color: black, }}
            variant="h4"
          >
            Mi Equipo
          </Typography>
          <Stack direction='row' sx={{ pt: 3 }}>
            {renderPlayers}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyTeam;