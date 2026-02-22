import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addExpesne, createTravelByHr, deleteTravel, getAllExpenses, getAllTravels, getFilteredExpenses, getMyExpenses, getTravelForEmployee, getTravelList, updateExpense, updateExpenseStatus, updateTravel } from "../travel.service"
import { toast } from "react-toastify"
import type { CreateTravelFormData, UpdateExpenseDto } from "../../types/travel.types"

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

export const useTravelList = () =>{
    return useQuery({
        queryKey : ['travel-list'],
        queryFn : getTravelList,
        staleTime : 60 * 60 * 1000
    })
}
export const useUpdateTravel = (onSuccess? : ()=> void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({id,data} : {id:string; data: CreateTravelFormData}) =>updateTravel(id,data),
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

export const useGetAllTravel = (isHr : boolean) =>{
    return useQuery({
        queryKey : ['travel'],
        queryFn : isHr ? getAllTravels : getTravelForEmployee,
        staleTime : 5 * 60 * 60 * 1000,
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

export const useExpenses = (isHr : boolean) =>{
    return useQuery({
        queryKey : ['expenses', isHr],
        queryFn : isHr ? getAllExpenses : getMyExpenses,
        staleTime : 5 * 60 * 60 * 1000
    })
}

export const useFilteredExpenses = (filters: any, enabled: boolean) => {
    return useQuery({
        queryKey: ['expenses', 'filtered', filters],
        queryFn: () => getFilteredExpenses(filters),
        enabled: enabled && !!filters,
    });
};

export const useAddExpenseMutation = (onSuccess? : () => void) =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : addExpesne,
        onSuccess : () =>{
            toast.success("Expense added")
            queryClient.invalidateQueries({ queryKey : ['expenses']})
            onSuccess?.()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to add expense";
            toast.error(message);
        },
    })
}

export const useUpdateExpenseStatus = (onSuccess? : () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,data} : {id:string, data: UpdateExpenseDto}) => updateExpenseStatus(id,data),
        onSuccess : () =>{
            toast.success(`Expense Status Updated`)
            queryClient.invalidateQueries({ queryKey : ['expenses']})
            onSuccess?.()
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to update status";
            toast.error(message);
        },
    })
}

export const useUpdateExpense = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) => 
            updateExpense(id, formData),
        onSuccess: () => {
            toast.success("Expense updated successfully");
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            onSuccess?.();
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Failed to update expense";
            toast.error(message);
        },
    });
};