
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { white, mainBlue } from '../../utils/colors';

const Loading = () => {
  return (
    <Backdrop
      sx={{ color: white, backgroundColor: mainBlue, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
