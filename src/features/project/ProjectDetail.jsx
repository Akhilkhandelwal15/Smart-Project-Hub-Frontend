import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../../api/projectApi";
import { getUser } from "../../api/userApi";
import { ProjectForm } from "../../components/project/ProjectForm";
import { ProjectMembers } from "../../components/project/ProjectMembers";
import { ProjectSettings } from "../../components/project/ProjectSettings";
import { ProjectStats } from "../../components/project/ProjectStats";
import { useToast } from "../../context/ToastContext";
import { updateProjectSchema } from "../../validations/projectValidation";

export const ProjectDetail = ()=>{
    const {showToast} = useToast();
    const {projectId} = useParams();

    const { data: projectData, isLoading: projectLoading, isError: projectError } = useQuery(
        ["getProjectById", projectId], // query key includes id
        () => getProjectById(projectId) // function that returns the promise
    );

    const project = projectData?.success == true ? projectData.project : {}
    const tags = project?.tags?.join(", ");
    // console.log(project);

    const {data: usersData, isLoading:usersLoading, isError:usersError} = useQuery(
        ["getUsers"], getUser
    );

    // console.log("userData:", usersData);

    let projectMembers = [];
    let projectManagers = [];
    let projectOwner = [];
    let membersToDisplay = [];
    let managersToDisplay = [];
    let projectOwnerEmail = "";

    if(projectData && usersData){
        const projectUsers = projectData.project.members;
        projectMembers = projectUsers.filter((m)=>m.role==="member").map((m)=> m.user._id);
        projectManagers = projectUsers.filter((m)=>m.role==="manager").map((m)=> m.user._id);
        projectOwner = projectUsers.filter((m)=>m.role==="owner").map((m)=> m.user._id);
        projectOwnerEmail = projectUsers.filter((m)=>m.role==="owner").map((m)=> m.user.email);

        membersToDisplay = usersData.filter((user)=>
            !projectManagers.some((manager)=>manager._id===user._id) && !projectOwner.some((owner) => owner === user._id)
        );

        managersToDisplay = usersData.filter((user)=>
            !projectMembers.some((member)=>member._id===user._id) && !projectOwner.some((owner) => owner === user._id)
        );

        // console.log(membersToDisplay, managersToDisplay);
    }
    
        
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
            members: projectMembers,
            managers: projectManagers,
            allowComments: project?.settings?.allowComments || false,
            allowAttachments: project?.settings?.allowAttachments || false,
            status: project?.status || 'active'
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
                members: projectMembers,
                managers: projectManagers,
                allowComments: project?.settings?.allowComments || false,
                allowAttachments: project?.settings?.allowAttachments || false,
                status: project?.status || 'active'
            })
        }
    },[projectData, reset, usersData]);

    const mutation = useMutation((formData)=>updateProject(project._id, formData), {
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
        console.log("inside form submit");
        console.log("new data:",data);
    }

    if(projectLoading || usersLoading){
        return <h2>Loading....</h2>
    }

    if(projectError || usersError){
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
                    membersToDisplay = {membersToDisplay}
                    managersToDisplay = {managersToDisplay}
                    owner = {projectOwnerEmail}
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