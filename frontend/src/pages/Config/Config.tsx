import React, { useState } from "react";
import { Box, Tabs, Tab, Paper, Typography } from "@mui/material";
import ConfigList from "./ConfigList";
import ConfigForm from "./ConfigForm";
import GameTypeForm from "./GameTypeForm";
import GameTypeList from "./GameTypeList";
import {
  useConfigs,
  useDeleteConfig,
  useDeleteGame,
  useGames,
} from "../../services/queries/config.queries";
import Loader from "../../components/ui/RequestLoaders";

const ConfigDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedItem, setSelectedItem] = useState<any>(undefined);

  const { data, isLoading } = useConfigs();
  const { data: games, isLoading: gamesLoading } = useGames();
  const deleteConfig = useDeleteConfig();
  const deleteGame = useDeleteGame();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setView("list");
  };

  const handleCreate = () => {
    setSelectedItem(undefined);
    setView("create");
  };

  const handleClose = () => {
    setView("list");
    setSelectedItem(undefined);
  };

  const handleDeleteConfig = (id: number) => {
    deleteConfig.mutate(id);
  };

  const handleDeleteGame = (id: number) => {
    deleteGame.mutate(id);
  };

  if (isLoading || gamesLoading) return <Loader />;

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      <Paper
        elevation={0}
        className="p-4 mb-6 border border-gray-200 rounded-xl"
      >
        {/* <Typography variant="h4" className="font-bold text-gray-800 mb-4">
          
        </Typography> */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          className="border-b border-gray-100"
        >
          <Tab label="System Configs" className="font-semibold" />
          <Tab label="Game Scheduling" className="font-semibold" />
        </Tabs>
      </Paper>

      <Box className="mt-4">
        {tabValue === 0 ? (
          <ConfigList
            configs={data}
            onDeleteConfig={handleDeleteConfig}
            onAddConfig={handleCreate}
            onEditConfig={(config) => {
              setSelectedItem(config);
              setView("edit");
            }}
          />
        ) : (
          <GameTypeList
            onAdd={handleCreate}
            onEdit={(game) => {
              setSelectedItem(game);
              setView("edit");
            }}
            onDelete={handleDeleteGame}
            games={games}
          />
        )}
      </Box>

      {tabValue === 0 && (view === "create" || view === "edit") && (
        <ConfigForm
          initialData={selectedItem}
          onSuccess={handleClose}
          onCancel={handleClose}
        />
      )}

      {tabValue === 1 && (view === "create" || view === "edit") && (
        <GameTypeForm
          initialData={selectedItem}
          onSuccess={handleClose}
          onCancel={handleClose}
        />
      )}
    </Box>
  );
};

export default ConfigDashboard;
