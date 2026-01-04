import { FormControlLabel, MenuItem, Stack, Switch, TextField, Typography } from "@mui/material"

export const ProjectSettings = ()=>{
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Project Settings
            </Typography>
            <Stack spacing={2}>
                <FormControlLabel
                control={
                    <Switch defaultChecked 
                    />
                }
                label="Allow comments"
                />

                <FormControlLabel
                control={
                    <Switch defaultChecked 
                    />
                }
                label="Allow attachments"
                />
                <TextField 
                    select
                    label="Status"
                >
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="team">Team</MenuItem>
                </TextField>
            </Stack>
        </>
        
    )
}