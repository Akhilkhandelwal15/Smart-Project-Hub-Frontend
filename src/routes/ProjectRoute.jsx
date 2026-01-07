import { Navigate } from "react-router-dom";
import { useProjectAuth } from "../context/ProjectAuthContext";

export const ProjetRoute = ({allowedRoles, children})=>{
  console.log("Before error");
  const {role, isLoading, isError} = useProjectAuth();
  console.log("roleeee:", role, isLoading, isError);

  if(isLoading) return <h2>Loading...</h2>;
  if(isError || !allowedRoles.includes(role)){
    return <Navigate to="/dashboard" replace />
  } 
  return children;
}