import { MenuItem, TextField, Typography } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import { Can } from "../can/Can";

export const ProjectMembers = ({register, errors, control, managersToDisplay, membersToDisplay, owner})=>{
    const selectedManagers = useWatch({control, name:"managers", defaultValue: []});
    const selectedMembers = useWatch({control, name:"members", defaultValue: []});

    const filteredManagers = managersToDisplay.filter((m)=> !selectedMembers.includes(m._id));
    const filteredMembers = membersToDisplay.filter((m)=> !selectedManagers.includes(m._id));

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Project Members
            </Typography>
            <TextField 
                label="owner"
                value={owner}
                disabled
                readOnly
            />
            <Can permission="canManageManagers">
                <Controller
                    name="managers"
                    control={control}
                    defaultValue={[]}
                    render={({field})=>(
                        <TextField 
                            select
                            label="Select managers"
                            {...field}
                            slotProps={{
                                select: {
                                    multiple: true,
                                },
                            }}
                        >
                            {filteredManagers.map((m)=>(
                                <MenuItem value={m._id} key={m._id}>{m.email}</MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            </Can>
        
            <Can permission="canManageMembers">
                <Controller
                    name="members"
                    control={control}
                    defaultValue={[]}
                    render={({field})=>(
                        <TextField 
                            select
                            label="Select members"
                            {...field}
                            slotProps={{
                                select: {
                                    multiple: true,
                                },
                            }}
                        >
                            {filteredMembers.map((m)=>(
                                <MenuItem value={m._id} key={m._id}>{m.email}</MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            </Can>
        </>
    )
}