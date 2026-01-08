import { Navigate } from "react-router-dom";
import { useProjectAuth } from "../context/ProjectAuthContext";

export const ProjetRoute = ({permission, children})=>{
  console.log("Before error");
  const {permissions, isLoading, isError} = useProjectAuth();
  console.log("permissions:", permissions, isLoading, isError);

  if(isLoading) return <h2>Loading...</h2>;
  if(isError || !permissions?.[permission]){
    return <Navigate to="/dashboard" replace />
  } 
  return children;
}