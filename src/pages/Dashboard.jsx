import { ProjectCreate } from "../features/project/ProjectCreate";
import { ProjectDetail } from "../features/project/ProjectDetail";
import { ProjectList } from "../features/project/ProjectList";

export const Dashboard = ()=>{
  return (
    <>
    <ProjectCreate />
     {/* <ProjectCard /> */}
    <ProjectList/>
    </>
  );
}