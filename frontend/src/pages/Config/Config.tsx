import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ConfigForm from "./ConfigForm";
import ConfigList from "./ConfigList";
import CommonModal from "../../components/ui/CommonModal";
import type { Config } from "../../types/config.types";
import { useConfigs, useDeleteConfig } from "../../services/queries/config.queries";
import Loader from "../../components/ui/RequestLoaders";

const Branch: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedConfig, setSelectedConfig] = useState<Config | undefined>(undefined);
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const {data, isLoading} = useConfigs();
  const deleteConfig = useDeleteConfig();
  const handleCreate = () =>{
    setSelectedConfig(undefined)
    setView('create')
  }

  const handleEdit = (config : Config) =>{
    const configToEdit = data?.find((c) => c.Id === config.Id);
    if(configToEdit){
        setSelectedConfig(configToEdit)
        setView("edit")
    }
  }

  const handleCloseModal = () => {
    setView("list");
    setSelectedConfig(undefined);
  };

  const handleDelete = () =>{
    if(deletedId){
        deleteConfig.mutate(deletedId)
        setDeletedId(null)
    }
  }

  if(isLoading) return <Loader/>

  return (
    <Box sx={{ p: 2 }}>
      <ConfigList 
        isLoading
        configs={data}
        onAddConfig={handleCreate}
        onEditConfig={handleEdit}
        onDeleteConfig={handleDelete}
      />
      {view === "create" && (
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
