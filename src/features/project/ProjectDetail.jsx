import { useForm } from "react-hook-form";
import { ProjectDangerZone } from "../../components/project/ProjectDangerZone";
import { ProjectForm } from "../../components/project/ProjectForm";
import { ProjectMembers } from "../../components/project/ProjectMembers";
import { ProjectSettings } from "../../components/project/ProjectSettings";
import { ProjectStats } from "../../components/project/ProjectStats";
import { useToast } from "../../context/ToastContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProjectSchema } from "../../validations/projectValidation";
import { useMutation, useQuery } from "react-query";
import { getProjectById, updateProject } from "../../api/projectApi";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const ProjectDetail = ()=>{
    const {showToast} = useToast();
    const {projectId} = useParams();

    const { data, isLoading, isError } = useQuery(
        ["getProjectById", projectId], // query key includes id
        () => getProjectById(projectId) // function that returns the promise
    );

    const project = data?.success == true ? data.project : {}
    const tags = project?.tags?.join(", ");
    console.log(project);
        
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset
    } = useForm({
        resolver: yupResolver(updateProjectSchema),
        defaultValues:{
            name: project?.name || "",
            description: project?.description || "",
            visibility: project?.visibility || "private",
            tags: tags || "",
        }
    });

    // reset form when project data loads
    useEffect(()=>{
        if(project){
            reset({
                name: project.name || "",
                description: project.description || "",
                visibility: project.visibility || "private",
                tags: tags || "",
            })
        }
    },[data, reset]);

    const mutation = useMutation(updateProject, {
        onSuccess: (data)=>{
            if(data.success === true){
                console.log("Project updated successfully");
                showToast("Project updated successfully", "success");
            }
        },
        onError: (error)=>{
            const message = error.response?.data?.message || 'Project Update Failed';
            console.log("error:", message);
            showToast(message, 'error');
        }
    });
    
    const handleUpdateProjectFormSubmit = (data)=>{
        mutation.mutate(data);
        console.log(data);
    }

    if(isLoading){
        return <h2>Loading....</h2>
    }

    if(isError){
        return <h2>Error...</h2>
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Edit Project
            </Typography>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit(handleUpdateProjectFormSubmit)}>
                <ProjectForm
                    register = {register}
                    errors = {errors}
                    control = {control}
                />
                <ProjectMembers
                    register = {register}
                    errors = {errors}
                    control = {control}
                />
                <ProjectSettings
                    register = {register}
                    errors = {errors}
                    control = {control}
                />
                <ProjectStats 
                    stats = {project?.stats}
                />
                {/* <ProjectDangerZone /> */}
                <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Updating..." : "Update Project"}
                </Button>
            </Box>
        </Paper>
    );
}