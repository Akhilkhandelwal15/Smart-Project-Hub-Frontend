import { Card, CardContent, CardHeader } from "@mui/material";
import { Stat } from "../common/Stat";

export const ProjectStats = ({stats})=>{
    return (
        <Card>
            <CardHeader title="Stats" />
            <CardContent>
            <Stat label="Total Tasks" value={stats.totalTasks} />
            <Stat label="Completed Tasks" value={stats.completedTasks} />
            </CardContent>
        </Card>
    );
}