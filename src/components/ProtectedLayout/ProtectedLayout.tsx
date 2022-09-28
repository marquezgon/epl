import { Navigate, Outlet } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import SideBar from '../SideBar/SideBar';
import Onboard from '../Onboard/Onboard';
import TopBar from '../TopBar/TopBar';
import { getCurrentUser } from '../../auth';
import { useUserStore } from '../../store';
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
  // const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/" />;
  // }
  const currentUser = getCurrentUser();
  const getTeam = useQuery(GET_TEAM, { variables: { username: currentUser?.getUsername() } });
  const updateUser = useUserStore((state) => state.updateUser);
  
  updateUser(getTeam.data?.getTeamByUsername);
  
  if (getTeam.loading) return <Loading />;

  return (
    <>
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