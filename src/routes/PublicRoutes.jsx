import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../api/authApi";

const PublicRoute = ({children})=>{
  const {data:user, isLoading, isError} = useQuery(["me"], verifyUser, {
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;