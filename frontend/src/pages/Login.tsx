import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Link,
  Alert,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useLoginForm } from '../hooks/useAuthForm';
import { Layout } from '../components/Layout';

export const Login: React.FC = () => {
  const formik = useLoginForm();

  return (
    <Layout>
      <Container component="main" maxWidth="xs" sx={{ height: 'calc(100vh - 128px)', display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Log in
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {formik.status && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formik.status}
                </Alert>
              )}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                disabled={formik.isSubmitting}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                disabled={formik.isSubmitting}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Logging in...' : 'Log In'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}; 