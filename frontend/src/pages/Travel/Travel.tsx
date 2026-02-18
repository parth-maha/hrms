import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TravelForm from "./TravelForm";
import TravelList from "./TravelList";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import Loader from "../../components/ui/RequestLoaders";
import useAuthStore from "../../store/auth.store";
import type { Travel, Travel as TravelType } from "../../types/travel.types";
import {
  useDeleteTravel,
  useGetAllTravel,
} from "../../services/queries/travel.queries";

const Travel: React.FC = () => {
  const { roles } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"plans" | "expenses">("plans");
  const [view, setView] = useState<"list" | "create" | "edit">("list");

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const [selectedTravel, setSelectedTravel] = useState<TravelType | undefined>(
    undefined,
  );

  const { data, isLoading } = useGetAllTravel(roles==="HR");
  const deleteTravel = useDeleteTravel();

  const handleCreateTravel = () => {
    setSelectedTravel(undefined);
    setView("create");
  };

  const handleEditTravel = (travel: TravelType) => {
    setSelectedTravel(travel);
    setView("edit");
  };

  const handleAddExpenseClick = (travel: Travel) => {
    setSelectedTravel(travel);
    setShowExpenseForm(true);
  };

  const handleCloseModals = () => {
    setView("list");
    setShowExpenseForm(false);
    setSelectedTravel(undefined);
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <div className="flex mb-1">
        <ToggleButtonGroup
          value={activeTab}
          exclusive
          onChange={(_, val) => val && setActiveTab(val)}
          size="small"
        >
          <ToggleButton value="plans" className="px-6">
            Travel Plans
          </ToggleButton>
          <ToggleButton value="expenses" className="px-6">
            Expenses
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {activeTab === "plans" ? (
        <>
          <TravelList
            travels={data}
            onAddTravel={handleCreateTravel}
            onEditTravel={handleEditTravel}
            onDeleteTravel={(id) => deleteTravel.mutate(id)}
            onAddExpense={handleAddExpenseClick}
          />

          {(view === "create" || view === "edit") && (
            <TravelForm
              initialData={selectedTravel}
              onSuccess={handleCloseModals}
              onCancel={handleCloseModals}
            />
          )}
        </>
      ) : (
        <ExpenseList />
      )}

      {showExpenseForm && (
        <ExpenseForm
          open={showExpenseForm}
          onClose={handleCloseModals}
          initialTravel={selectedTravel}
        />
      )}
    </Box>
  );
};

export default Travel;
