import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { mainBlue, white } from '../../utils/colors';
import s3Client from '../../helpers/s3Client';
import { getCurrentUser } from '../../auth';
import { useModalStore } from '../../store';
import './Onboard.scss';

const loginSchema = Yup.object({
  fullName: Yup.string().required('Tu nombre completo es requerido'),
  teamName: Yup.string().required('El nombre de tu equipo es requerido'),
  psUsername: Yup.string().required('El nombre de usuario PlayStation es requerido'),
});

interface FormValues {
  fullName: string;
  teamName: string;
  psUsername: string;
  logo: any;
}

const ADD_TEAM = gql`
  mutation CreateTeam($ownerName: String!, $name: String!, $psUsername: String!, $logo: String, $username: String!) {
    createTeam(input: {owner_name: $ownerName, name: $name, ps_username: $psUsername, logo: $logo, username: $username}) {
      id
      name
    }
  }
`;

type File = string | ArrayBuffer | null;

const Onboard = () => {
  const [logoPreview, setLogoPreview] = useState<File>(null);
  const [addTeam] = useMutation(ADD_TEAM);
  const updateShowOnboarding = useModalStore((state) => state.updateShowOnboarding);
  const showOnboarding = useModalStore((state) => state.showOnboarding);

  const currentUser = getCurrentUser();

  const handleSubmit = async (values: FormValues) => {
    const username = currentUser?.getUsername()
    if (values.logo && username) {
      const fileExt = values.logo.name.split('.').pop();
      const logoStr = `${username}/logo.${fileExt}`;

      const uploadParams = {
        Bucket: 'epremierleague-team-owner-images',
        // Add the required 'Key' parameter using the 'path' module.
        Key: `uploads/${logoStr}`,
        // Add the required 'Body' parameter
        Body: values.logo,
      };
      try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        addTeam({ variables: { logo: logoStr, name: values.teamName, ownerName: values.fullName, psUsername: values.psUsername, username  } });
        updateShowOnboarding(false);
      } catch (err) {
        console.log('Error', err);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      fullName: '',
      teamName: '',
      psUsername: '',
      logo: null
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showOnboarding}
    >
      <Paper sx={{ pb: 8, px: 6, pt: 4, backgroundColor: '#f0f0f0', maxWidth: '600px', boxSizing: 'border-box' }}>
        <Typography variant={'h4'} align='center' color={mainBlue}>
          REGISTRA A TU EQUIPO
        </Typography>
        <Typography variant='subtitle1' align='center' sx={{ pb: 1, pt: 1.5 }} color={mainBlue}>
          Antes de comenzar, ingresa tus datos y los de tu equipo.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ my: 3 }}
            InputProps={{ sx: { backgroundColor: white } }}
            fullWidth
            name="fullName"
            label="Tu nombre completo"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            sx={{ my: 3 }}
            InputProps={{ sx: { backgroundColor: white } }}
            fullWidth
            name="teamName"
            label="Nombre de tu equipo"
            value={formik.values.teamName}
            onChange={formik.handleChange}
            error={formik.touched.teamName && Boolean(formik.errors.teamName)}
            helperText={formik.touched.teamName && formik.errors.teamName}
          />
          <TextField
            sx={{ my: 3 }}
            InputProps={{ sx: { backgroundColor: white } }}
            fullWidth
            name="psUsername"
            label="Tu nombre de usuario PlayStation"
            value={formik.values.psUsername}
            onChange={formik.handleChange}
            error={formik.touched.psUsername && Boolean(formik.errors.psUsername)}
            helperText={formik.touched.psUsername && formik.errors.psUsername}
          />
          <Box sx={{ px: 1.8, mt: 1 }}>
            <Box>
              <FormLabel>Logo de tu equipo</FormLabel>
            </Box>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                name="logo"
                onChange={(e) => {
                  if (!e.target.files) return;
                  formik.setFieldValue('logo', e.target.files[0]);
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      setLogoPreview(fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
              />
              {logoPreview && typeof logoPreview === 'string' ?
                <img src={logoPreview} className='onboard__logo-preview' /> : <PhotoCamera sx={{ width: 50, height: 50 }} />
              }
            </IconButton>
            {formik.touched.logo && Boolean(formik.errors.logo) &&
              <Box>
                <FormHelperText error>{formik.touched.logo && formik.errors.logo}</FormHelperText>
              </Box>
            }
          </Box>

          <Grid container display='flex' justifyContent='center' sx={{ mt: 3 }}>
            <Button type="submit" disabled={formik.isSubmitting} variant='contained' size='large'>
                INGRESAR
            </Button>
          </Grid>
        </form>
      </Paper>
    </Backdrop>
  );
}

export default Onboard;