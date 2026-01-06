import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useToast } from "../context/ToastContext";
import queryClient from "../queryClient";
import { signSchema } from "../validations/authValidation";

export const Signup = ()=>{

  const {showToast} = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(signSchema),
    // mode: 'onBlur' 
  });

  const mutation = useMutation(registerUser, {
    onSuccess: (data)=>{
      console.log("Signup successful.", data);
      queryClient.invalidateQueries(["currentUser"]);
      navigate("/dashboard");
    },
    onError: (error)=>{
      const message = error.response?.data?.message || 'Signup failed';
      console.log(message);
      showToast(message, 'error');
    }
  });

  const onSignFormSubmit = (data)=>{
    console.log("sigup data:", data);
    mutation.mutate(data);
  }

  return (
    <>
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSignFormSubmit)} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" align="center">Signup</Typography>
        <TextField 
          label="Name" 
          {...register('name')}
          error = {!!errors.name}
          helperText = {errors.name?.message}
          fullWidth 
        />
        <TextField 
          label="Email" 
          type="email" 
          {...register('email')}
          error = {!!errors.email}
          helperText = {errors.email?.message}
          fullWidth 
        />
        <TextField 
          label="Password" 
          type="password" 
          {...register('password')}
          error = {!!errors.password}
          helperText = {errors.password?.message}
          fullWidth 
        />
        <TextField 
          label="Confirm Password" 
          type="password" 
          {...register('confirmPassword')}
          error = {!!errors.confirmPassword}
          helperText = {errors.confirmPassword?.message}
          fullWidth 
        />
        <Button variant="contained" color="primary" type="submit">Signup</Button>
      </Box>
    </Container>
    </>
  );
}