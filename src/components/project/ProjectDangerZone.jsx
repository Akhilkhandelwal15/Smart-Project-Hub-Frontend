import { Button, Card, CardHeader } from "@mui/material";

export const ProjectDangerZone = ()=>{
    return (
        <Card sx={{ borderColor: "error.main", p:3 }}>
            <CardHeader title="Danger Zone" />
            <Button color="error" variant="contained">Archive Project</Button>
        </Card>
    );
}