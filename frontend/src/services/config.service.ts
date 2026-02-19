import { type Config, type ConfigFormData, type Game, type GameFormData } from "../types/config.types"
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

export const addGame = async (data: GameFormData) =>{
    const response = await api.post('/GameType',data)
    return response.data
}

export const getAllGames = async () =>{
    const response = await api.get<Game[]>(`/GameType`)
    return response.data
}

export const deleteGame = async (id: number) =>{
    const response = await api.delete(`/${id}`)
    return response.data
}