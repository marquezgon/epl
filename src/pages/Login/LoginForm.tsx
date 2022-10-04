import React from 'react';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthStore, useLoginStore, useUserStore } from '../../store';
import { white } from '../../utils/colors';
import logoImg from '../../img/logo@2x.png';
import awsExports from '../../aws-exports';

const loginSchema = Yup.object({
  email: Yup.string().required('Correo electrónico es requerido').email('Correo electrónico es requerido'),
  password: Yup.string().required('Contraseña requerida').min(8, 'La contraseña es muy corta - mínimo 8 caracteres'),
});

interface State {
  showPassword: boolean;
}

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const LoginForm = () => {
  // hooks
  const updateStatus = useLoginStore((state) => state.updateStatus);
  const updateCognitoUser = useAuthStore((state) => state.updateCognitoUser);
  const updateCognitoSession = useAuthStore((state) => state.updateCognitoSession);
  const updateUser = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit
  });

  const [formState, setFormState] = React.useState<State>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };

  function handleSubmit(values: FormValues) {
    const { email, password } = values;
    const userPool = new CognitoUserPool(awsExports);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationData = {
      Username : email,
      Password : password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        updateCognitoSession(result);
        navigate('/dashboard');
        console.log(result);
      },
      onFailure: (err) => {
        console.log(err);
        formik.setSubmitting(false);
      },
      newPasswordRequired: (userAttributes) => {
        delete userAttributes.email_verified;
        delete userAttributes.email;

        updateUser(userAttributes);
        updateCognitoUser(cognitoUser);
        updateStatus('password');
      }
    });
  }

  return (
    <Paper sx={{ pb: 8, px: 6, pt: 4, backgroundColor: 'transparent', minHeight: '570px', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <img src={logoImg} height='96px' />
      </Box>
      <Typography variant='h5' align='center' color='primary'>
        LA LIGA DE LOS GRANDES
      </Typography>
      <Typography variant='h2' align='center' sx={{ pb: 1 }}>
        ePremier League
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ my: 3 }}
          InputProps={{ sx: { backgroundColor: white } }}
          fullWidth
          name="email"
          label="Correo Electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ my: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { backgroundColor: white }
          }}
          fullWidth
          name="password"
          label="Contraseña"
          type={formState.showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Grid container display='flex' justifyContent='center' sx={{ mt: 3 }}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant='contained'
            size='large'
            className={classNames('login__btn', { 'login__btn--disabled': formik.isSubmitting })}
          >
              INGRESAR
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginForm;