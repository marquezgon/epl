import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useModalStore, usePlayerStore, useUserStore } from '../../store';
import { black, darkGray, mainBlue } from '../../utils/colors';
import { cache, getFlag } from '../../utils/utils';
import { UserData } from '../../utils/types';

const PlayerDrawer = () => {
  const selectedPlayer = usePlayerStore((state) => state.selectedPlayer);
  const showPlayerDrawer = useModalStore((state) => state.showPlayerDrawer);
  const { budget } = useUserStore((state) => state.user) as UserData;
  const updateShowPlayerDrawer = useModalStore((state) => state.updateShowPlayerDrawer);

  const toggleDrawer = () => updateShowPlayerDrawer(!showPlayerDrawer);

  const country = getFlag(selectedPlayer?.nationality);

  const handlePurchase = () => {
    if (selectedPlayer?.price && selectedPlayer?.transferable == 1) {

      const transaction = budget - selectedPlayer.price;
      if (transaction >= 0) {
        const normalizedId = cache.identify({
          id: selectedPlayer.id,
          __typename: selectedPlayer.__typename
        });
        cache.evict({ id: normalizedId });
        cache.gc();
        toggleDrawer();
      }
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
        <Box sx={{ px: 3, pt: 4, height: '100%' }}>
          <Stack direction='column' justifyContent='center' alignItems='center'>
            <Typography variant='h5' sx={{ mb: 2 }}>FICHA DEL JUGADOR</Typography>
            <Card sx={{ maxWidth: 345, position: 'relative', width: '100%' }}>
              {country && (
                <Box
                  component='label'
                  sx={{ pl: .5, fontSize: '2rem', position: 'absolute', right: '20px', top: '14px' }}
                  title={country.text}>{country.flag}
                </Box>
              )}
              <CardMedia
                component='img'
                image={selectedPlayer?.photo}
                alt={selectedPlayer?.name}
                sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%', pt: 2 }}
              />
              <CardContent sx={{ pt: 1, pb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography gutterBottom variant='h5' sx={{ mb: 0, lineHeight: '1.1rem', color: black, pr: 1 }}>
                    {selectedPlayer?.name}
                  </Typography>
                  <Chip label={
                    <Typography gutterBottom variant='subtitle1' sx={{ color: darkGray, fontWeight: '600', mb: 0 }}>
                      {selectedPlayer?.position}
                    </Typography>
                  } />
                </Box>
                <NumericFormat
                  value={selectedPlayer?.price}
                  thousandSeparator=','
                  displayType='text'
                  renderText={(value) => (
                    <Typography gutterBottom variant='subtitle1' sx={{ color: darkGray, fontSize: '1.1rem', fontWeight: '600' }}>
                      {`$${value}`}
                    </Typography>
                  )}
                />
                <Typography variant='body2' color='text.secondary'>
                  <span style={{ fontWeight: '500' }}>Nombre Completo: </span>{selectedPlayer?.fullName}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <span style={{ fontWeight: '500' }}>Posición: </span>{selectedPlayer?.position}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <span style={{ fontWeight: '500' }}>Edad: </span>{selectedPlayer?.age}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
        <Box sx={{ mx: 5 }}>
          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Button variant='outlined' onClick={toggleDrawer} color='gray'>
              Cancelar
            </Button>
            <Button variant='contained' color='secondary' onClick={handlePurchase}>
              Comprar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default PlayerDrawer;
