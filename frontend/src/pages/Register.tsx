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
import { useRegisterForm } from '../hooks/useAuthForm';
import { Layout } from '../components/Layout';

export const Register: React.FC = () => {
  const formik = useRegisterForm();

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
              Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {formik.status && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {formik.status}
                </Alert>
              )}
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
                disabled={formik.isSubmitting}
              />
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
              <TextField
                fullWidth
                id="password_confirmation"
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password_confirmation &&
                  Boolean(formik.errors.password_confirmation)
                }
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
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
                {formik.isSubmitting ? 'Registering...' : 'Register'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}; 