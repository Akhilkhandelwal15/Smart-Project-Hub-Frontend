import { useProjectAuth } from "../../context/ProjectAuthContext";

export const Can = ({permission, children})=>{
  const {permissions, isLoading, isError} = useProjectAuth();

  if(isLoading || isError) return null;
  if(!permissions?.[permission]) return null;

  return children;
}