import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { verifyUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
  const {data: user, isLoading, isError} = useQuery(["currentUser"], verifyUser, {
    staleTime: 5*60*1000 // query will not fetch the data automatically till 5 mins on Page loads, Navigate to another route, Component remounts, Switch browser tab (focus), Network reconnect
  });

  console.log("usetr:", user);

  return (
    <AuthContext.Provider value={{user, isLoading, isError}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> {
  return useContext(AuthContext);
} 