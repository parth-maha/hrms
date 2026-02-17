import type { CreateTravelFormData,Travel } from "../types/travel.types"
import api from "./axios"

export const getTravelForEmployee = async() =>{
    const response = await api.get<Travel[]>('/Travel/my')
    return response.data
}

export const getAllTravels = async () =>{
    const response = await api.get<Travel[]>('/Travel/all')
    return response.data;
}

export const createTravelByHr = async (data : CreateTravelFormData) =>{
    const formData = getCreateTravelForm(data)    
    const response = await api.post('/Travel/plan' ,formData,{
        headers : {
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data
}

export const deleteTravel = async (id:string)=>{
    const response = await api.delete(`/Travel/${id}`)
    return response.data
}

export const updateTravel = async(id:string, data: FormData)=>{
    const response = await api.put(`/Travel/${id}`,data,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data
}

// ======================== HELPERS ==================

const getCreateTravelForm = (data : CreateTravelFormData) =>{
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('startDate', data.startDate)
    formData.append('endDate', data.endDate)
    
    if(data.employeeIds && Array.isArray((data.employeeIds))){
        data.employeeIds.forEach((id : string) => {
            formData.append('employeeIds',id)
        })
    }
    console.log(data.documents);
    
    if(data.documents){
        data.documents.forEach((doc) => {
            formData.append('documents', doc.file)
        })
    }

    return formData;
}