import { useProjectAuth } from "../../context/ProjectAuthContext";

export const AuthorizedProject = ({allowedRoles=[], children})=>{
  const {role, isLoading, isError} = useProjectAuth();
  console.log(allowedRoles, role);
  if(isLoading || isError) return null;
  if(!role || !allowedRoles.includes(role)) return null;
  return children;
}