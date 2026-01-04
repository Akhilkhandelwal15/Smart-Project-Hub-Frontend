import { Card, CardContent, CardHeader, MenuItem, TextField, Typography } from "@mui/material"

export const ProjectMembers = ()=>{
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Project Members
            </Typography>
            <TextField 
                label="owner"
                disabled
                readOnly
            />
            <TextField 
                select
                label="Visibility"
            >
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="team">Team</MenuItem>
            </TextField>
            <TextField 
                select
                label="Visibility"
            >
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="team">Team</MenuItem>
            </TextField>
        </>
    )
}