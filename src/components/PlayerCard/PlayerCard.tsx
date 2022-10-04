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

export enum CardSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
};

interface PlayerCardProps {
  player: PlayerData
  size?: CardSize
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
  const maxWidth = props.size === CardSize.SMALL ? 184 : props.size === CardSize.LARGE ? 400 : 256;
  const rightPos = props.size === CardSize.SMALL ? '8px' : '20px';
  const topPos = props.size === CardSize.SMALL ? '0px' : '14px';

  return (
    <Card sx={{ maxWidth, position: 'relative', width: '100%' }}>
      {props.size === CardSize.SMALL && (
        <Chip sx={{ position: 'absolute', left: '8px', top: '8px', backgroundColor: 'beige'}} label={
          <Typography gutterBottom variant='subtitle1' sx={{ color: darkGray, fontWeight: '600', mb: 0 }}>
            {player?.position}
          </Typography>
        } />
      )}
      {country && (
        <Box
          component='label'
          sx={{ pl: .5, fontSize: '2rem', position: 'absolute', right: rightPos, top: topPos }}
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
          <Typography
            gutterBottom
            variant='h5'
            sx={{ mb: 0, lineHeight: '1.2rem', color: black, pr: 1, wordBreak: 'break-word' }}
          >
            {player.name}
          </Typography>
          {props.size !== CardSize.SMALL && (
            <Chip label={
              <Typography gutterBottom variant='subtitle1' sx={{ color: darkGray, fontWeight: '600', mb: 0 }}>
                {player?.position}
              </Typography>
            } />
          )}
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
        {(props.size === CardSize.MEDIUM || props.size === CardSize.LARGE) && (
          <>
            <Typography variant='body2' color='text.secondary'>
              <span style={{ fontWeight: '500' }}>Nombre Completo: </span>{player.fullName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <span style={{ fontWeight: '500' }}>Posición: </span>{player.position}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <span style={{ fontWeight: '500' }}>Edad: </span>{player.age}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

PlayerCard.defaultProps = {
  size: CardSize.MEDIUM
};

export default PlayerCard;