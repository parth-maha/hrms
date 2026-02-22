import React, { useState, useEffect } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterAlt } from "@mui/icons-material";
import TravelForm from "./TravelForm";
import TravelList from "./TravelList";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import Loader from "../../components/ui/RequestLoaders";
import Button from "../../components/ui/Button";
import useAuthStore from "../../store/auth.store";
import type { Travel as TravelType } from "../../types/travel.types";
import {
  useDeleteTravel,
  useGetAllTravel,
} from "../../services/queries/travel.queries";

const Travel: React.FC = () => {
  const { roles } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState<TravelType | undefined>(undefined);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeTab = pathname.includes("expenses") ? "expenses" : "plans";

  const { data, isLoading } = useGetAllTravel((roles==="HR" || roles==="MANAGER"));
  const deleteTravel = useDeleteTravel();

  const handleTabChange = (_: any, val: string) => {
    if (val) {
      navigate(val === "expenses" ? "/expenses" : "/travel");
    }
  };

  const handleCreateTravel = () => {
    setSelectedTravel(undefined);
    setView("create");
  };

  const handleEditTravel = (travel: TravelType) => {
    setSelectedTravel(travel);
    setView("edit");
  };

  const handleAddExpenseClick = (travel: TravelType) => {
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
      <div className="flex justify-between items-center mb-4">
        <ToggleButtonGroup
          value={activeTab}
          exclusive
          onChange={handleTabChange}
          size="small"
        >
          <ToggleButton value="plans" className="px-6">
            Travel Plans
          </ToggleButton>
          <ToggleButton value="expenses" className="px-6">
            Expenses
          </ToggleButton>
        </ToggleButtonGroup>

        {activeTab === "expenses" && (
          <Button
            variant="contained"
            startIcon={<FilterAlt />}
            onClick={() => setIsFilterOpen(true)}
          >
            Filter Expenses
          </Button>
        )}
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
        <ExpenseList 
          isFilterOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
        />
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