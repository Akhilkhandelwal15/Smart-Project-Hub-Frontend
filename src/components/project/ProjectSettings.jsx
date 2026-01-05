import { FormControlLabel, MenuItem, Stack, Switch, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"

export const ProjectSettings = ({register, errors, control})=>{
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Project Settings
            </Typography>
            <Stack spacing={2}>
                <Controller
                    name="allowComments"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Switch
                                    {...field}
                                    checked={field.value} // important!
                                />
                            }
                            label="Allow comments"
                        />
                    )}
                />
                <Controller
                    name="allowAttachments"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Switch  
                                    {...register('allowAttachments')}
                                    checked={field.value} // important!
                                />
                            }
                            label="Allow attachments"
                        />
                    )}
                />
                
                <Controller
                    name="status"
                    control={control}
                    render={({ field })=>(
                        <TextField 
                            select
                            label="Select status"
                            {...field}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                        </TextField>
                    )}
                
                />
            </Stack>
        </>
        
    )
}