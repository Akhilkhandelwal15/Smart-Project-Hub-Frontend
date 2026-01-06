import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/projectApi";
import { ProjectCard } from "../../components/project/ProjectCard";

export const ProjectList = () => {

    const {data, isLoading, isError} = useQuery(["projects"], getProjects);

    if(isLoading){
        return <h4>Loading....</h4>
    }

    if(isError){
        return <h4>Error...</h4>
    }

    return (
    <Box
        sx={{
        minHeight: "100vh",
        backgroundColor: "#f6f8fb",
        px: { xs: 2, md: 4 },
        py: 4
        }}
    >
        <Stack direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            mb={4} 
        >
            <Stack direction="column">
                <Typography variant="h4" fontWeight={700} mb={1}>
                    My Projects
                </Typography>

                <Typography variant="body1" color="text.secondary" mb={4}>
                    Manage and explore your project portfolio
                </Typography>
            </Stack>
            <Button variant="contained" color="primary" component={Link} to={'/project/create'}>
                Create Project
            </Button>
        </Stack>
        
        
        <Box
        sx={{
            display: "grid",
            gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(auto-fit, minmax(350px, 1fr))"
            },
            gap: 3
        }}
        >
        {data.success && data.projects?.map((project)=>(
            <ProjectCard project={project} key={project._id} />
        ))}
        {/* <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard /> 
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard /> */}
        </Box>
    </Box>
    );
};