import { useForm } from "react-hook-form";
import { useToast } from "../../context/ToastContext";
import { ProjectForm } from "../../components/project/ProjectForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { createProject } from "../../api/projectApi";
import { createProjectSchema } from "../../validations/projectValidation"; 
import { Box, Button, Paper, Typography } from "@mui/material";


export const ProjectCreate = ()=>{
    const {showToast} = useToast();
    
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        resolver: yupResolver(createProjectSchema)
    });

    const mutation = useMutation(createProject, {
        onSuccess: (data)=>{
            if(data.success === true){
            console.log("Project created successfully");
            showToast("Project created successfully", "success");
        }
    },
    onError: (error)=>{
        const message = error.response?.data?.message || 'Project Creation Failed';
        console.log("error:", message);
        showToast(message, 'error');
    }
    })

    const handleCreateProjectFormSubmit = (data)=>{
        mutation.mutate(data);
        console.log(data);
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Create New Project
            </Typography>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit(handleCreateProjectFormSubmit)}>
                <ProjectForm
                    register = {register}
                    errors = {errors}
                    control = {control}
                />
                <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Creating..." : "Create Project"}
                </Button>
            </Box>
        </Paper>
    );
}