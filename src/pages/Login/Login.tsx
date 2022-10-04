import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useLoginStore } from '../../store';
import LoginForm from './LoginForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import Onboard from '../../components/Onboard/Onboard';
import './Login.scss';

const Login = () => {
  const status = useLoginStore((state) => state.status);

  return (
    <section className='login'>
      <Box sx={{ my: 8 }}>
        <Container maxWidth='sm'>
          <Box sx={{ position: 'relative' }}>
            {status === 'password' && < UpdatePasswordForm />}
            {status === 'login' && < LoginForm />}
            <Box className='login__form-container' />
          </Box>
        </Container>
      </Box>
      <Box
        className='login__img-backdrop'
      />
      <Box
        className='login__img-container'
      />
      <Onboard />
    </section>
  );
}

export default Login;