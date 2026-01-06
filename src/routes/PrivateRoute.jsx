import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({allowedRoles, children})=>{
  // const {data: user, isLoading, isError} = useQuery(['me'], verifyUser);
  const { user, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user || !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
}

export default PrivateRoute;