import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Typography } from '@mui/material';
import { mainBlue, white } from '../../utils/colors';
import LinkButton from '../../components/LinkButton/LinkButton';
import './SideBar.scss';

const drawerWidth = 240;

const tournamentPages = [
  { text: 'Clasificación', href: '/standings', icon: <FormatListNumberedIcon /> },
  { text: 'Resultados', href: '/results', icon: <ScoreboardIcon /> },
  { text: 'Calendario', href: '/calendar', icon: <CalendarMonthIcon /> },
  { text: 'Mi Equipo', href: '/my-team', icon: <PeopleIcon /> }
];

const marketPages = [
  { text: 'Transferibles', href: '/market/listings', icon: <AttachMoneyIcon /> },
];

const SideBar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: mainBlue,
          position: 'static'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List className='sidebar__list'>
        <ListItem>
          <Typography variant='body1' sx={{ fontSize: '1.10rem' }}>
            Torneo Clausura &apos;22
          </Typography>
        </ListItem>
        {tournamentPages.map(({ text, href, icon }) => (
          <ListItem key={text} disablePadding sx={{ fontWeight: 100 }} className='sidebar__list-item'>
            <LinkButton href={href} sx={{ fontWeight: 100, color: white, textTransform: 'none' }}>
              <ListItemIcon sx={{ color: white, justifyContent: 'center' }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} className='sidebar__link' />
            </LinkButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: white }} />
      <List className='sidebar__list'>
        <ListItem>
          <Typography variant='body1' sx={{ fontSize: '1.10rem' }}>
            Mercado de Transferencias
          </Typography>
        </ListItem>
        {marketPages.map(({ text, href, icon }) => (
          <ListItem key={text} disablePadding sx={{ fontWeight: 100 }} className='sidebar__list-item'>
            <LinkButton href={href} sx={{ fontWeight: 100, color: white, textTransform: 'none' }}>
              <ListItemIcon sx={{ color: white, justifyContent: 'center' }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} className='sidebar__link' />
            </LinkButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;