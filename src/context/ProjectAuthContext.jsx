import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProjectPermissions } from "../api/projectApi";

const ProjectAuthContext = createContext();

export const ProjectAuthProvider = ({children})=>{
  console.log("inside provider", useParams());
  const {projectId} = useParams();
  console.log('projectId', projectId);
  const {data, isLoading, isError} = useQuery(
    ["projectPermissions", projectId],
    ()=> getProjectPermissions(projectId),
    {
      enabled: !!projectId, // important: api will be called when projectId has some value or defined. initially projectId might be undefined. so, whenever it has value then the query will run. If enabled is true, the query runs immediately (or when dependencies change).
    }
  );
  console.log("datataata:", data);

  return <ProjectAuthContext.Provider value={{
    role: data?.role,
    permissions: data?.permissions,
    isLoading,
    isError,
  }}>
    {children}
  </ProjectAuthContext.Provider>
}

export const useProjectAuth = ()=>{
  return useContext(ProjectAuthContext);
}