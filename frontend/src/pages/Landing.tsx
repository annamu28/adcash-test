import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ height: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 6, width: '100%', textAlign: 'center' }}>
            <Typography component="h1" variant="h3" gutterBottom>
              Campaign Management Tool
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Manage your marketing campaigns efficiently and effectively
            </Typography>
            
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                },
                gap: 3,
                mt: 4,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/login')}
                sx={{ py: 2 }}
              >
                Log In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ py: 2 }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
}; 