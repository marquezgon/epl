import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthStore, useUserStore, useModalStore } from '../../store';
import { white } from '../../utils/colors';

const confirmPasswordSchema = Yup.object({
  password: Yup.string().required('Contraseña requerida').min(8, 'La contraseña es muy corta - mínimo 8 caracteres'),
  confirmPassword: Yup.string().required('Vuelve a ingresar tu contraseña').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
});

interface State {
  showPassword: boolean;
}

// Shape of form values
interface FormValues {
  password: string;
  confirmPassword: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const UpdatePasswordForm = () => {
  // hooks
  const updateCognitoSession = useAuthStore((state) => state.updateCognitoSession);
  const cognitoUser = useAuthStore((state) => state.cognitoUser);
  const currentUser = useUserStore((state) => state.user);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: confirmPasswordSchema,
    onSubmit: handleSubmit
  });
  const updateShowOnboarding = useModalStore((state) => state.updateShowOnboarding);

  const [formState, setFormState] = React.useState<State>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };

  function handleSubmit(values: FormValues) {
    cognitoUser?.completeNewPasswordChallenge(values.password, currentUser, {
      onSuccess: (result) => {
        updateCognitoSession(result);
        updateShowOnboarding(true);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFailure: (err: any) => {
        console.log(err);
      }
    });
  }

  return (
    <Paper sx={{ pb: 8, px: 6, pt: 4, backgroundColor: 'transparent', minHeight: '450px', boxSizing: 'border-box' }}>
      <Typography variant='h4' align='center' sx={{ pb: 1 }}>
        Actualiza Tu Contraseña
      </Typography>
      <Typography variant='subtitle1' align='center' sx={{ pb: 1 }}>
        Por seguridad necesitas ingresar una nueva contraseña porque es tu primera vez iniciando sesión.<br />
        ** La contraseña debe ser de mínimo 8 caracteres.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
          name="confirmPassword"
          label="Reingresa tu contraseña"
          type={formState.showPassword ? 'text' : 'password'}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        <Grid container display='flex' justifyContent='center' sx={{ mt: 3 }}>
          <Button type="submit" disabled={formik.isSubmitting} variant='contained' size='large'>
              INGRESAR
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdatePasswordForm;