import React from 'react';
import { gql, useMutation } from '@apollo/client';
import classNames from 'classnames';
// import shallow from 'zustand/shallow'
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useModalStore, usePlayerStore, useUserStore } from '../../store';
import {  mainBlue, white } from '../../utils/colors';
import { cache } from '../../utils/utils';
import { PlayerData, UserData } from '../../utils/types';
import { marketplaceStatus } from '../../aws-exports';
import './PlayerDrawer.scss';
import PlayerCard from '../PlayerCard/PlayerCard';

const BUY_PLAYER = gql`
  mutation BuyPlayer($playerId: ID!, $teamId: ID!) {
    buyPlayer(playerId: $playerId, teamId: $teamId) {
      budget
    }
  }
`;

const PlayerDrawer = () => {
  const [pdError, setPdError] = React.useState<string | null>(null);
  const [buyPlayer, { loading }] = useMutation(BUY_PLAYER);
  const selectedPlayer = usePlayerStore((state) => state.selectedPlayer);
  const showPlayerDrawer = useModalStore((state) => state.showPlayerDrawer);
  // const updateBudget = useUserStore((state) => state.updateBudget);
  const addToast = useModalStore((state) => state.addToast);
  const updateSearchValue = usePlayerStore((state) => state.updateSearchValue);
  const searchValue = usePlayerStore((state) => state.searchValue);
  const { budget, id } = useUserStore((state) => state.user, () => true) as UserData;

  const updateShowPlayerDrawer = useModalStore((state) => state.updateShowPlayerDrawer);

  const toggleDrawer = () => updateShowPlayerDrawer(!showPlayerDrawer);
  console.log(pdError);
  const transaction = budget - (selectedPlayer?.price ?? 0);
  const handlePurchase = async () => {
    if (marketplaceStatus === 'open') {
      if (selectedPlayer?.price && selectedPlayer?.transferable == 1) {
        if (transaction >= 0) {
          try {
            await buyPlayer({ variables: { teamId: id, playerId: selectedPlayer.id } });
            addToast({ message: `¡Felicidades, acabas de fichar a ${selectedPlayer.name} en tu equipo!` });
            const normalizedId = cache.identify({
              id: selectedPlayer.id,
              __typename: selectedPlayer.__typename
            });
            cache.evict({ id: normalizedId });
            cache.gc();

            if (searchValue !== '') {
              updateSearchValue('');
            }

            // updateBudget(newBudget);

            toggleDrawer();
          } catch(e) {
            console.error(e);
          }
        } else {
          setPdError('No tienes los fondos suficientes para comprar este jugador');
        }
      }
    } else {
      addToast({ message: 'El mercado de transferencias está cerrado por el momento.', type: 'error' });
    }
  }

  return (
    <Drawer
      open={showPlayerDrawer}
      anchor='right'
      variant='temporary'
      onClose={toggleDrawer}
      PaperProps={{ sx: { backgroundColor: mainBlue }} }
    >
      <Box
        role='presentation'
        sx={{ width: 360 }}
      >
        <Box sx={{ px: 3, pt: 4 }}>
          <Stack direction='column' justifyContent='center' alignItems='center'>
            <Typography variant='h5' sx={{ mb: 2 }}>FICHA DEL JUGADOR</Typography>
            <PlayerCard player={selectedPlayer as PlayerData} />
          </Stack>
        </Box>
        <Box sx={{ mx: 5 }}>
          <Stack direction='row' spacing={2} justifyContent='space-between' sx={{ my: 4 }}>
            <Button variant='outlined' onClick={toggleDrawer} color='gray'>
              Cancelar
            </Button>
            <Button
              className={classNames({ 'player-drawer__confirm-btn--disabled': loading })}
              variant='contained'
              color='secondary'
              onClick={handlePurchase}
              disabled={loading}
            >
              Comprar
            </Button>
          </Stack>
          <Stack sx={{ pt:1 }}>
            <Typography sx={{ color: white }}>Presupuesto Actual: <NumericFormat value={budget} thousandSeparator="," displayType="text" renderText={(value) => `$${value}`} />
            </Typography>
            <Typography sx={{ color: white, pt: 2 }}>Presupuesto Restante: <NumericFormat value={transaction} thousandSeparator="," displayType="text" renderText={(value) => `$${value}`} />
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default PlayerDrawer;
