import api from "./apiInstance";

export const createProject = async(data)=>{
    const res = await api.post("/project", data);
    return res.data;
}

export const getProjects = async()=>{
    const res = await api.get("/project");
    return res.data;
}

export const getProjectById = async(projectId)=>{
    const res = await api.get(`project/${projectId}`);
    return res.data;
}

export const updateProject = async(projectId, data)=>{
    const res = await api.put(`project/${projectId}`, data);
    return res.data;
}

export const deleteProject = async(projectId)=>{
    const res = await api.delete(`project/${projectId}`);
    return res.data;
}

export const getProjectPermissions = async(projectId)=>{
    console.log("inside api");
    const res = await api.get(`project/${projectId}/permissions`);
    return res.data;
}