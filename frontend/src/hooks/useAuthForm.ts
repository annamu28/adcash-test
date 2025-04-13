import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login, register } from '../services/api';

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues extends LoginFormValues {
  name: string;
  password_confirmation: string;
}

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const registerValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  return useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log('Attempting login with:', values);
        const response = await login(values);
        console.log('Login response:', response);
        authLogin(response);
        console.log('Auth context updated, navigating to /campaigns');
        navigate('/campaigns');
      } catch (error) {
        console.error('Login error:', error);
        setStatus('Invalid email or password');
      } finally {
        setSubmitting(false);
      }
    },
  });
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  return useFormik<RegisterFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log('Attempting registration with:', values);
        const response = await register(values);
        console.log('Registration response:', response);
        authLogin(response);
        console.log('Auth context updated, navigating to /campaigns');
        navigate('/campaigns');
      } catch (error) {
        console.error('Registration error:', error);
        setStatus('Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });
}; 