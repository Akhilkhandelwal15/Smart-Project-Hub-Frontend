import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { createProjectSchema } from "../../validations/projectValidation";

export const ProjectForm = ()=>{

  const {
    register,
    handleSubmit,
    formState: {errors},
    control
  } = useForm({
    resolver: yupResolver(createProjectSchema)
  });

  const handleCreateProjectFormSubmit = (data)=>{
    console.log(data);
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Create New Project
      </Typography>

      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit(handleCreateProjectFormSubmit)}>
        <TextField
          label="Project Name"
          {...register('name')}
          error={!!errors.name} // !! is not of not (means it just convert value to boolean)
          helperText={errors.name?.message}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        {/* MUI need controller for select field */}
        <Controller
          name="visibility"
          control={control}
          defaultValue=""
          render={({field})=>(
            <TextField 
              select
              label="Visibility"
              {...field}
              error={!!errors.visibility}
              helperText={errors.visibility?.message}
            >
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </TextField>
          )}
        />

        <TextField
          label="Tags (comma separated)"
          {...register('tags')}
        />
        
        <Button type="submit" variant="contained" color="primary">
          Create Project
        </Button>
      </Box>
    </Paper>
  );
}