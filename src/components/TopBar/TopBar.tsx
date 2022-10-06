import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import shallow from 'zustand/shallow'
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logoImg from '../../img/logo@2x.png';
import { getCurrentSession, getCurrentUser } from '../../auth';
import { useUserStore } from '../../store';
import { logoPath } from '../../utils/utils';
import { UserData } from '../../utils/types';

const pages = ['Iniciar Sesión'];

const TopBar = () => {
  const currentUser = getCurrentUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const userInfo: UserData | null = useUserStore((state) => state.user, shallow);
  // const paw = useUserStore.getState().user
  // const unsub1 = useUserStore.subscribe(console.log);
  // console.log(paw);

  useEffect(() => {
    const onError = () => navigate('/login');
    getCurrentSession(onError);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = () => {
    handleCloseNavMenu();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleCloseNavMenu();
    if (currentUser) {
      currentUser.signOut();
      navigate('/login');
    }
  };

  console.log(userInfo?.budget);

  return (
    <AppBar position="static" sx={{ height: '70px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <img src={logoImg} height='48px' />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Mi Perfil</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Cerrar Sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'right' }}>
            <img src={logoImg} height='48px' />
          </Box> */}
          { currentUser && userInfo ? (
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ pr: 1.5 }}>
                <Typography sx={{ lineHeight: '1.3' }}>{userInfo.name}</Typography>
                <Typography sx={{ lineHeight: '1.3' }}>
                  <NumericFormat
                    value={userInfo.budget}
                    thousandSeparator=","
                    displayType="text"
                    renderText={(value) => `$${value}`}
                  />
                </Typography>
              </Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo.name} src={`${logoPath}${userInfo.logo}`} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleNavigate}>
                  <Typography textAlign="center">Mi Perfil</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;