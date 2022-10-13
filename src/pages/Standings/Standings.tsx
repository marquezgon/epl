import { useQuery } from '@apollo/client';
import StandingsTable from '../../components/StandingsTable/StandingsTable';
import { GET_STANDINGS } from '../../utils/gql/queries';


const Standings = () => {
  const { loading, error, data } = useQuery(GET_STANDINGS, { variables: { tournamentId: '3c30d51b-04b4-407b-91c9-701be295e597' } });

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <StandingsTable
      data={data.getStandings}
    />
  )
};

export default Standings;