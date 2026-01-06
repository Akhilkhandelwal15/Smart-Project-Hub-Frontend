import { useAuth } from "../../context/AuthContext";

export const Authorized = ({allowedRoles=[], children})=>{
  const user = useAuth();
  if(!user || !allowedRoles.includes(user.role)){
    return null;
  }
  return children;
}