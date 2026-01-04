import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const ProjectForm = ({register, errors, control})=>{

  return (
    <>
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
            <MenuItem value="team">Team</MenuItem>
          </TextField>
        )}
      />

      <TextField
        label="Tags (comma separated)"
        {...register('tags')}
      />
    </>
  );
}