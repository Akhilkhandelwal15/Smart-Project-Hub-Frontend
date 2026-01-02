import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useToast } from "../context/ToastContext";
import { loginSchema } from "../validations/authValidation";

export const Login = ()=>{

  const {showToast} =  useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(loginSchema),
    // mode: 'onBlur' 
  });

  const mutation = useMutation(loginUser, {
    onSuccess: (data)=>{
      console.log("login successful", data);
      navigate("/dashboard");
    },
    onError: (error)=>{
      const message = error.response?.data?.message || 'Login failed';
      console.log("error:", message);
      showToast(message, 'error');
    }
  });
  
  const onLoginFormSubmit = (data)=>{
    console.log("data:", data);
    mutation.mutate(data);
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit(onLoginFormSubmit)}>
        <Typography variant="h4" align="center">Login</Typography>

        <TextField 
          label="Email" 
          type="email" 
          {...register('email')}
          error={!!errors.email} // !! is not of not (means it just convert value to boolean)
          helperText={errors.email?.message}
          fullWidth 
        />

        <TextField 
          label="Password" 
          type="password" 
          {...register('password')}
          error={!!errors.password} 
          helperText={errors.password?.message}
          fullWidth 
        />

        <Button variant="contained" color="primary" type="submit">Login</Button>

      </Box>
    </Container>
  );
}

