import type { EmployeeOption, Job, JobFormData, ReferJobDTO, ShareJobDTO } from "../types/job.types";
import api from "./axios";

export const getEmployeeOptions = async() => {
    const response = await api.get<EmployeeOption[]>('/Employee/list')
    return response.data;
}

export const getJobs = async () =>{
    const response = await api.get<Job[]>('/Job')
    return response.data
}

export const createJob= async (data : JobFormData) =>{
    const response = await api.post('/Job/create', data)
    return response.data
}

export const updateJob = async (id : string, data: JobFormData)=>{
    const response = await api.put(`Job/edit/${id}`, data)
    return response.data;
}

export const deleteJob = async (id: string) =>{
    const response = await api.delete(`/Job/${id}`)
    return response.data
}
export const shareJob = async (data : ShareJobDTO)=>{
    const response = await api.post('/Job/share', data)
    return response.data
}

export const referJob = async (data: ReferJobDTO) =>{
    const response = await api.post(`/Job/refer`,data)
    return response.data
}