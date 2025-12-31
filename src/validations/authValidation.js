import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Enter a valid email.').required('Email is required.'),
  password: yup.string().min(6, 'Password must be atleast 6 characters.').required('Password is required.')
});

export const signSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required.'),
  password: yup.string().min(6, 'Password must be atleast 6 characters.')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[a-z]/, 'Must contain one lowercase letter')
    .matches(/[0-9]/, 'Must contain one number')
    .required('Password is required.'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required.')
});