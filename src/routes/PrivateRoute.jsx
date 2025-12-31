import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../api/authApi";

const PrivateRoute = ({children})=>{
  const {data: user, isLoading, isError} = useQuery(['me'], verifyUser, {
    retry: false,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <Navigate to="/login" replace />;

  return children;
}

export default PrivateRoute;