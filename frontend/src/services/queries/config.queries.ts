import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addConfig, addGame, deleteConfig, deleteGame, getAllConfigs, getAllGames, updateConfig } from "../config.service"
import { toast } from "react-toastify"
import type { ConfigFormData } from "../../types/config.types"

export const useConfigs = () =>{
    return useQuery({
        queryKey : ['configs'],
        queryFn : getAllConfigs,
        staleTime : 60 * 60 * 1000 //1hr
    })
}

export const useCreateConfig = (onSuccess? : ()=> void) =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addConfig,
        onSuccess : () =>{
            toast.success("Config created")
            queryClient.invalidateQueries({queryKey:['configs']}),
            onSuccess?.()
        }
    })
}

export const useUpdateConfig = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ConfigFormData }) =>
      updateConfig(id, data),
    onSuccess: () => {
      toast.success('Config updated');
      queryClient.invalidateQueries({ queryKey: ['configs'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update config');
    },
  });
};

export const useDeleteConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConfig,
    onSuccess: () => {
      toast.success('Config deleted');
      queryClient.invalidateQueries({ queryKey: ['configs'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete config');
    },
  });
};

export const useGames = () =>{
  return useQuery({
     queryKey : ['games'],
     queryFn: getAllGames,
     staleTime : 60 * 60 * 1000
  })
}

export const useDeleteGame = async () =>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn : deleteGame,
    onSuccess : () =>{
      toast.success('Game Deleted')
      queryClient.invalidateQueries({queryKey : ['games']})
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete game');
    },
  })
}

export const useAddGame = (onSuccess? : ()=> void) =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addGame,
        onSuccess : () =>{
            toast.success("Game Added")
            queryClient.invalidateQueries({queryKey:['games']}),
            onSuccess?.()
        }
    })
}