import { Outlet } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import SideBar from '../SideBar/SideBar';
import TopBar from '../TopBar/TopBar';
import { getCurrentUser } from '../../auth';
import { useAuthStore, useModalStore, useTeamStore, useUserStore } from '../../store';
import Loading from '../Loading/Loading';
import { lightGray } from '../../utils/colors';
import { LIST_TEAMS } from '../../utils/gql/queries';


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
  const updateTeams = useTeamStore((state) => state.updateTeams);
  const loadingSession = useAuthStore((state) => state.loadingSession);

  // const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/" />;
  // }

  const currentUser = getCurrentUser();
  
  const getTeam = useQuery(GET_TEAM, { variables: { username: currentUser?.getUsername() } });
  const teams = useQuery(LIST_TEAMS, { variables: { limit: 12 }, onCompleted: (data) => {
    if (data?.listTeams?.items) {
      updateTeams(data.listTeams.items);
    }
  } });

  if (loadingSession) {
    return <Loading />;
  }
  
  updateUser(getTeam.data?.getTeamByUsername);
  
  if (getTeam.loading || teams.loading) {
    return <Loading />;
  }

  console.log(teams);

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
        <SideBar />
        <Box sx={{ m: 1.5, width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default ProtectedLayout;