import { useProjectAuth } from "../../context/ProjectAuthContext";

export const AuthorizedProject = (allowedRoles=[], children)=>{
  const {role, isLoading, isError} = useProjectAuth();

  if(isLoading || isError) return null;
  if(!role && !allowedRoles.includes(role)) return null;
  return children;
}