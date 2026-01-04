import { Card, CardContent, CardHeader } from "@mui/material";
import { Stat } from "../common/Stat";

export const ProjectStats = ()=>{
    return (
        <Card>
            <CardHeader title="Stats" />
            <CardContent>
            <Stat label="Total Tasks" value={10} />
            <Stat label="Completed Tasks" value={5} />
            </CardContent>
        </Card>
    );
}