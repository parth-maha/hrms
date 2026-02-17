import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTravelByHr, deleteTravel, getAllTravels, getTravelForEmployee, updateTravel } from "../travel.service"
import { toast } from "react-toastify"

export const useEmployeeTravels = () =>{
    return useQuery({
        queryKey :['emp-travel'],
        queryFn : getTravelForEmployee,
        staleTime : 60 * 60 * 1000
    })
}

export const useCreateTravelByHr = (onSuccess? : ()=> void) =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : createTravelByHr,
        onSuccess : () =>{
            toast.success("Travel Created")
            queryClient.invalidateQueries({queryKey:['travel']})
            onSuccess?.()
        }
    })
}

export const useUpdateTravel = (onSuccess? : ()=> void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({id,data} : {id:string; data: FormData}) =>updateTravel(id,data),
        onSuccess : () =>{
            toast.success("Travel Updated")
            queryClient.invalidateQueries({queryKey: ['travel']});
            onSuccess?.()
        },
        onError : (error:any)=>{
            toast.error(error.response?.data?.message || "Failed to update travel")
        }
    })
}

export const useGetAllTravel = () =>{
    return useQuery({
        queryKey : ['travel'],
        queryFn : getAllTravels,
        staleTime : 60 * 60 * 1000,
    })
}

export const useDeleteTravel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTravel,
    onSuccess: () => {
      toast.success('Travel deleted');
      queryClient.invalidateQueries({ queryKey: ['travel'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete travel');
    },
  });
};