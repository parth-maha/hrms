import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { createJob, deleteJob, getEmployeeOptions, getJobs, referJob, shareJob, updateJob } from "../job.service";
import { toast } from "react-toastify";
import type { JobFormData } from "../../types/job.types";

export const useJobs = () =>{
    return useQuery({
        queryKey : ['jobs'],
        queryFn : getJobs,
        staleTime : 10 * 60 * 1000 //10 min
    })
}

export const useEmployeeOptions = () =>{
    return useQuery({
        queryKey : ['employees-list'],
        queryFn:getEmployeeOptions,
        staleTime: 60 * 60 * 1000 // 1hr
    })
}

export const useCreateJob = (onSuccess? : () => void) =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createJob,
        onSuccess :()=>{
            toast.success("Job created")
            queryClient.invalidateQueries({queryKey: ['jobs']})
            onSuccess?.()
        },
        onError: (e : any) =>{
            toast.error(e.response?.data?.message || "failed to create")
        },
    })
}

export const useUpdateJob = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: JobFormData }) =>
      updateJob(id, data),
    onSuccess: () => {
      toast.success('Job updated');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update job');
    },
  });
};
 
export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success('Job deleted');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete job');
    },
  });
};
 
export const useShareJob = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: shareJob,
    onSuccess: () => {
      toast.success('Job shared');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to share job');
    },
  });
};
 
export const useReferJob = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: referJob,
    onSuccess: () => {
      toast.success('Candidate referred');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to refer');
    },
  });
};