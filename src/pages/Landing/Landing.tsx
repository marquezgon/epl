import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinkButton from '../../components/LinkButton/LinkButton';
import './Landing.scss';

function Landing() {
  return (
    <section className='landing'>
      <Container fixed>
        <Box sx={{
          paddingTop: '32px'
        }}>
          <Typography variant='h4' align='center' color='primary'>
            LA LIGA DE LOS GRANDES
          </Typography>
          <Typography variant='h1' align='center'>
            ePremier League
          </Typography>
          <Grid container display='flex' justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
            
            <LinkButton
              variant='outlined'
              color='secondary'
              size='large'
              href='/login'
            >
              Ingresar
            </LinkButton>
          </Grid>
        </Box>
      </Container>
      <Box
        className="landing__img-container"
      />
    </section>
  );
}

export default Landing;