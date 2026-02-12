import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ConfigForm from "./ConfigForm";
import ConfigList from "./ConfigList";
import type { Config } from "../../types/config.types";
import { useConfigs, useDeleteConfig } from "../../services/queries/config.queries";
import Loader from "../../components/ui/RequestLoaders";

const Branch: React.FC = () => {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedConfig, setSelectedConfig] = useState<Config | undefined>(undefined);
  const {data, isLoading} = useConfigs();
  const deleteConfig = useDeleteConfig();
  
  const handleCreate = () =>{
    setSelectedConfig(undefined)
    setView('create')
  }

  const handleEdit = (config : Config) =>{
    const configToEdit = data?.find((c) => c.id === config.id);
    if(configToEdit){
        setSelectedConfig(configToEdit)
        setView("edit")
    }
  }

  const handleCloseModal = () => {
    setView("list");
    setSelectedConfig(undefined);
  };

  const handleDelete = (id : number) =>{
        deleteConfig.mutate(id)
  }

  if(isLoading) return <Loader/>

  return (
    <Box sx={{ p: 2 }}>
      <ConfigList 
        configs={data}
        onAddConfig={handleCreate}
        onEditConfig={(config)=> handleEdit(config)}
        onDeleteConfig={(id:number) => handleDelete(id)}
      />
      {view === "create" || view ==='edit'&& (
          <ConfigForm
            initialData={selectedConfig}
            onSuccess={handleCloseModal}
            onCancel={handleCloseModal}
          />
      )}
    </Box>
  );
};

export default Branch;
