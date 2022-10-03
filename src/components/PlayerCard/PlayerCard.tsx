import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { getFlag } from '../../utils/utils';
import { black, bronze, darkGray, gold, mainGray } from '../../utils/colors';
import { PlayerData } from '../../utils/types';

interface PlayerCardProps {
  player: PlayerData
};

function generateBgColor(rating: number): string {
  if (rating > 70 && rating < 80) {
    return mainGray;
  } else if (rating >= 80) {
    return gold;
  }
  return bronze;
}

const PlayerCard = (props: PlayerCardProps) => {
  const { player } = props;
  const country = getFlag(player.nationality);
  const backgroundColor = generateBgColor(player.rating);
  return (
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
        image={`https://epremierleague-players.s3.amazonaws.com/${player.futdbId}.png`}
        alt={player.name}
        sx={{ display: 'block', width: '100%', backgroundColor, pt: 2 }}
      />
      <CardContent sx={{ pt: 1, pb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography gutterBottom variant='h5' sx={{ mb: 0, lineHeight: '1.1rem', color: black, pr: 1 }}>
            {player.name}
          </Typography>
          <Chip label={
            <Typography gutterBottom variant='subtitle1' sx={{ color: darkGray, fontWeight: '600', mb: 0 }}>
              {player?.position}
            </Typography>
          } />
        </Box>
        <NumericFormat
          value={player.price}
          thousandSeparator=','
          displayType='text'
          renderText={(value) => (
            <Typography gutterBottom variant='subtitle1' sx={{ color: darkGray, fontSize: '1.1rem', fontWeight: '600' }}>
              {`$${value}`}
            </Typography>
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          <span style={{ fontWeight: '500' }}>Nombre Completo: </span>{player.fullName}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          <span style={{ fontWeight: '500' }}>Posición: </span>{player.position}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          <span style={{ fontWeight: '500' }}>Edad: </span>{player.age}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;