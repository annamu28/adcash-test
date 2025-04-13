import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({ title, children }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            {title}
          </Typography>
          {children}
        </Paper>
      </Box>
    </Container>
  );
}; 