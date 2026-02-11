import type {
  EmployeeOption,
  Job,
  JobFormData,
  ReferJobDTO,
  ShareJobDTO,
} from "../types/job.types";
import api from "./axios";

export const getEmployeeOptions = async () => {
  const response = await api.get<EmployeeOption[]>("/Employee/list");
  return response.data;
};

export const getJobs = async () => {
  const response = await api.get<Job[]>("/Job");
  return response.data;
};

export const createJob = async (data: JobFormData) => {
  const formData = getFormData(data);
  const response = await api.post("/Job/create", formData ,{
    headers: {
       "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
};

export const updateJob = async (id: string, data: JobFormData) => {
  const formData = getFormData(data);
  const response = await api.put(`Job/edit/${id}`, formData,{
    headers: {
       "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/Job/${id}`);
  return response.data;
};
export const shareJob = async (data: ShareJobDTO) => {
  const response = await api.post("/Job/share", data);
  return response.data;
};

export const referJob = async (data: ReferJobDTO) => {
  const formData = new FormData();
  formData.append('JobId',data.JobId)
  formData.append('ReferredBy',data.ReferredBy)
  if(data.ToCv instanceof File)
  {
    formData.append('ToCv',data.ToCv)
  }
  formData.append('ToEmail',data.ToEmail)
  formData.append('ToName',data.ToName)

  const response = await api.post(`/Job/refer`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


// ============= HELPER ===============
const getFormData = (data : JobFormData)=>{
  const formData = new FormData();
  formData.append('Title',data.Title)
  formData.append('JobCode',data.JobCode)
  formData.append('PocId',data.PocId)
  formData.append('Description',data.Description)

  if(data.Reviewers && Array.isArray(data.Reviewers)){
    data.Reviewers.forEach((id)=>{
      formData.append('ReviewerIds',id)
    })
  }

  if(data.AttachedFile instanceof File){
    formData.append('AttachedFile',data.AttachedFile)
  }

  return formData
}


