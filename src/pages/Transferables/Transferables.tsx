import React from 'react';
import { useQuery } from '@apollo/client';
import TransferablesTable from '../../components/TransferablesTable/TransferablesTable';
import PlayerDrawer from '../../components/PlayerDrawer/PlayerDrawer';
import { GET_PLAYERS, SEARCH_PLAYERS } from '../../utils/gql/queries';
import { useAuthStore } from '../../store/';


const Transferables = () => {
  const [filteredPlayers, setFilteredPlayers] = React.useState<any>({});
  const apolloClient = useAuthStore((state) => state.apolloClient);
  const { loading, error, data, fetchMore } = useQuery(GET_PLAYERS, { variables: { transferable: 1, limit: 10 } });

  const handleSearch = async (searchTerm: string) => {
    console.log(searchTerm);
    const filter = { nickname: { contains: searchTerm }, transferable: { eq: 1 } };
    try {
      const result =  await apolloClient.query({
        query: SEARCH_PLAYERS,
        variables: { filter }
      });
      setFilteredPlayers(result.data);
    } catch(e) {
      console.error(e);
    }
  }

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredPlayers({});
    }
  }

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
      <TransferablesTable
        players={filteredPlayers?.getPlayersByOrder ? filteredPlayers?.getPlayersByOrder?.items : data.listPlayers?.items}
        nextToken={filteredPlayers?.getPlayersByOrder ? filteredPlayers?.getPlayersByOrder?.nextToken : data.listPlayers?.nextToken}
        loadMore={loadMore}
        onSearch={handleSearch}
        onSearchChange={handleSearchChange}
      />
      <PlayerDrawer />
    </>
  )
};

export default Transferables;