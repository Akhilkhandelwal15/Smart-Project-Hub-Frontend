import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton
} from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";

export const ProjectCard = ({project}) => {
const isPublic = project.visibility==="team";
console.log('project', project);
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        border: "1px solid",
        borderColor: "grey.200",
        borderTop: "5px solid",
        borderTopColor: isPublic ? "success.main" : "primary.main",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)"
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <FolderOutlinedIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            {project.name}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {project.description.length < 100 ? project.description : project.description.slice(0, 100) + "..."}
        </Typography>

        <Chip
          label={isPublic ? "Public" : "Private"}
          size="small"
          color={isPublic ? "success" : "primary"}
          sx={{ mb: 2 }}
        />

        {project.tags && project.tags.length>0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {project.tags.map((tag)=>(
                    <Chip label={tag} key={tag} size="small" variant="outlined" />
                ))}
            </Stack>
        )}
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          py: 1.5,
          borderTop: "1px solid",
          borderColor: "grey.200",
          justifyContent: "space-between"
        }}
      >
        <Button size="small" variant="outlined">
          View
        </Button>

        <Box>
          <IconButton size="small" color="primary" component={Link} to={`/projects/${project._id}`}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
