import { useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import StadiumIcon from '@mui/icons-material/Stadium';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';
import { mainBlue, white } from '../../utils/colors';
import LinkButton from '../../components/LinkButton/LinkButton';
import './SideBar.scss';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  position: 'static',
  backgroundColor: mainBlue,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: mainBlue,
  overflowX: 'hidden',
  position: 'static',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const tournamentPages = [
  { text: 'Clasificación', href: '/standings', icon: <FormatListNumberedIcon /> },
  { text: 'Resultados', href: '/results', icon: <ScoreboardIcon /> },
  { text: 'Calendario', href: '/calendar', icon: <CalendarMonthIcon /> },
  { text: 'Equipos', href: '/teams', icon: <PeopleIcon /> }
];

const marketPages = [
  { text: 'Transferibles', href: '/market/listings', icon: <AttachMoneyIcon /> },
  { text: 'Estadios', href: '/market/stadiums', icon: <StadiumIcon /> },
];

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(matches);

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  return (
    <Drawer
      sx={{
        // '& .MuiDrawer-paper': {
        //   width: drawerWidth,
        //   boxSizing: 'border-box',
        //   backgroundColor: mainBlue,
        //   position: 'static'
        // },
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      <List className='sidebar__list'>
        {open && (
          <ListItem>
            <Typography variant='body1' sx={{ fontSize: '1.10rem' }}>
              Torneo Clausura &apos;22
            </Typography>
          </ListItem>
        )}
        {tournamentPages.map(({ text, href, icon }) => (
          <ListItem key={text} disablePadding sx={{ fontWeight: 100 }} className='sidebar__list-item'>
            <LinkButton href={href} sx={{ fontWeight: 100, color: white, textTransform: 'none' }}>
              <ListItemIcon sx={{ color: white, justifyContent: 'center' }}>
                {icon}
              </ListItemIcon>
              { open && <ListItemText primary={text} className='sidebar__link' />}
            </LinkButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: white }} />
      <List className='sidebar__list'>
        {open && (
          <ListItem>
            <Typography variant='body1' sx={{ fontSize: '1.10rem' }}>
              Mercado de Transferencias
            </Typography>
          </ListItem>
        )}
        {marketPages.map(({ text, href, icon }) => (
          <ListItem key={text} disablePadding sx={{ fontWeight: 100 }} className='sidebar__list-item'>
            <LinkButton href={href} sx={{ fontWeight: 100, color: white, textTransform: 'none' }}>
              <ListItemIcon sx={{ color: white, justifyContent: 'center' }}>
                {icon}
              </ListItemIcon>
              { open && <ListItemText primary={text} className='sidebar__link' />}
            </LinkButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;