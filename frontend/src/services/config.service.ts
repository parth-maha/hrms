import { type Config, type ConfigFormData } from "../types/config.types"
import api from "./axios"

export const getAllConfigs = async ()=>{
    const response = await api.get<Config[]>("System")
    return response.data
}

export const addConfig = async(data : ConfigFormData) =>{
    const response = await api.post('/System/create',data)
    return response.data;
}

export const updateConfig = async(id:number, data : ConfigFormData)=>{
    const response = await api.put(`/System/edit/${id}`,data)
    return response.data
}

export const deleteConfig = async (id:number)=>{
    const response = await api.delete(`/System/${id}`)
    return response.data
}