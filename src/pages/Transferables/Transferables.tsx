import { gql, useQuery } from '@apollo/client';
import TransferablesTable from '../../components/TransferablesTable/TransferablesTable';

const GET_PLAYERS = gql`
  query ListPlayers($hello: Int) {
    listPlayers(filter: { transferable: { eq: $hello } }) {
      items {
      nickname
      }
    }
  }
`;

const Transferables = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_PLAYERS, { variables: { hello: + true } });

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  console.log(data);

  return (
    <>
      <TransferablesTable />
      <button onClick={() => fetchMore({ variables: { hello: true } })}>Fetch More</button>
    </>
  )
};

export default Transferables;