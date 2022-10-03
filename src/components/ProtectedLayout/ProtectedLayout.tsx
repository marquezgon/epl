import { Outlet } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import SideBar from '../SideBar/SideBar';
import Onboard from '../Onboard/Onboard';
import TopBar from '../TopBar/TopBar';
import { getCurrentUser } from '../../auth';
import { useAuthStore, useModalStore, useUserStore } from '../../store';
import Loading from '../Loading/Loading';
import { lightGray } from '../../utils/colors';


const GET_TEAM = gql`
  query TeamQuery($username: String!) {
    getTeamByUsername(username: $username) {
      name
      username
      owner_name
      logo,
      budget,
      id
    }
  }
`;


export const ProtectedLayout = () => {
  const toast = useModalStore((state) => state.toast);
  const removeToast = useModalStore((state) => state.removeToast);
  const updateUser = useUserStore((state) => state.updateUser);
  const loadingSession = useAuthStore((state) => state.loadingSession);

  // const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/" />;
  // }

  const currentUser = getCurrentUser();
  const getTeam = useQuery(GET_TEAM, { variables: { username: currentUser?.getUsername() } });

  console.log(loadingSession);

  if (loadingSession) {
    console.log('2');
    return <Loading />;
  }
  
  updateUser(getTeam.data?.getTeamByUsername);
  
  if (getTeam.loading) {
    console.log('3');
    return <Loading />;
  }

  console.log('1');

  return (
    <>
      <Stack spacing={8} sx={{ width: '100%' }}>
        {toast && (
          <Snackbar
            anchorOrigin={toast.position || { vertical: 'top', horizontal: 'center' }}
            open
            onClose={() => removeToast()}
            autoHideDuration={toast.duration || 4000}
          >
            <MuiAlert severity={toast.type || 'success'}>
              {toast.message}
            </MuiAlert>
          </Snackbar>
        )}
      </Stack>
      <TopBar />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 70px)', backgroundColor: lightGray }}>
        <Onboard />
        <SideBar />
        <Box sx={{ m: 1.5, width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default ProtectedLayout;