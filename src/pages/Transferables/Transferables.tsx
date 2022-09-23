import { gql, useQuery } from '@apollo/client';
import TransferablesTable from '../../components/TransferablesTable/TransferablesTable';
import PlayerDrawer from '../../components/PlayerDrawer/PlayerDrawer';

const GET_PLAYERS = gql`
  query ListPlayers($transferable: Int!, $nextToken: String, $limit: Int) {
    listPlayers(transferable: $transferable, limit: $limit, nextToken: $nextToken) {
      nextToken
      items {
        id
        name: nickname
        position
        price
        age: dob
        nationality
        photo
        fullName: full_name
        transferable
        ownedBy: owned_by
      }
    }
  }
`;

const Transferables = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_PLAYERS, { variables: { transferable: 1, limit: 10 } });

  const loadMore = () => fetchMore({
    query: GET_PLAYERS,
    variables: { transferable: 1, nextToken: data.listPlayers?.nextToken, limit: 10 },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const previousEntry = previousResult.listPlayers;
      const newItems = fetchMoreResult.listPlayers.items;
      const newToken = fetchMoreResult.listPlayers.nextToken;

      if (!previousEntry.nextToken) {
        return previousResult;
      }

      return {
        listPlayers: {
          nextToken: newToken,
          items: [...newItems, ...previousEntry.items],
          __typename: previousEntry.__typename
        },
      };
    }        
  })

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <TransferablesTable players={data.listPlayers?.items} nextToken={data.listPlayers?.nextToken} loadMore={loadMore} />
      <PlayerDrawer />
    </>
  )
};

export default Transferables;