import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signSchema } from "../validations/authValidation";

export const Signup = ()=>{

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(signSchema),
    // mode: 'onBlur' 
  });

  const onSignFormSubmit = (data)=>{
    console.log("sigup data:", data);
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