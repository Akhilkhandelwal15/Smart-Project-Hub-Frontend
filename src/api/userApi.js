import api from "./apiInstance";

export const getUser = async()=>{
  const res = await api.get("/user");
  return res.data.users;
}