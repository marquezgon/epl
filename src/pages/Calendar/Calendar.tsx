import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GET_FIXTURES_BY_WEEK } from '../../utils/gql/queries';
import { useTeamStore } from '../../store';
import { black } from '../../utils/colors';
import { FixturesData } from '../../utils/types';

const Calendar = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const teams = useTeamStore((state) => state.teams);
  const { loading, error, data } = useQuery(GET_FIXTURES_BY_WEEK, { variables: { tournamentId: '3c30d51b-04b4-407b-91c9-701be295e597', week: selectedWeek } });

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  if (loading) {
    return (
      <div>Loading</div>
    );
  }

  const weeks = [1,2,3,4,5,6,7,8,9,10,11]
  const renderWeeks = weeks.map((week) => (
    <MenuItem key={week} value={week.toString()}>Semana {week}</MenuItem>
  )); 

  console.log(data);

  const renderFixtures = data.getFixturesByWeek.map((fixture: FixturesData) => {
    return (
      <Box key={fixture.id}>
        <Typography>{teams.get(fixture.home_team_id)} vs {teams.get(fixture.away_team_id)}</Typography>
      </Box>
    )
  })

  return (
    <Box sx={{ width: '100%', maxHeight: '100%', overflowY: 'scroll' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 4 }}>
          <Stack direction='row' justifyContent='space-between'>
            <Box>
              <Typography
                sx={{ flex: '5', color: black }}
                variant="h4"
              >
                Calendario
              </Typography>
            </Box>
            <Select
              sx={{ alignSelf: 'center' }}
              value={selectedWeek.toString()}
              displayEmpty
              onChange={(week: SelectChangeEvent) => setSelectedWeek(Number(week.target.value))}
            >
              {renderWeeks}
            </Select>
          </Stack>
          <Stack direction='column' sx={{ pt: 3 }} flexWrap='wrap'>
            {renderFixtures}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Calendar;