import React, { useState } from "react";
import TravelForm from "./TravelForm";
import TravelList from "./TravelList";
import Loader from "../../components/ui/RequestLoaders";
import type { Travel } from "../../types/travel.types";
import {
  useDeleteTravel,
  useGetAllTravel,
} from "../../services/queries/travel.queries";

const Travel: React.FC = () => {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedTravel, setSelectedTravel] = useState<Travel | undefined>(
    undefined,
  );
  const { data, isLoading } = useGetAllTravel();
  const deleteTravel = useDeleteTravel();

  const handleCreate = () => {
    setSelectedTravel(undefined);
    setView("create");
  };

  const handleEdit = (travel: Travel) => {
    const travelToEdit = data?.find((t) => t.id === travel.id);
    if (travelToEdit) {
      setSelectedTravel(travelToEdit);
      setView("edit");
    }
  };

  const handleCloseModal = () => {
    setView("list");
    setSelectedTravel(undefined);
  };

  const handleDelete = (id: string) => {
    deleteTravel.mutate(id);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <TravelList
        travels={data}
        onAddTravel={handleCreate}
        onEditTravel={(travel) => handleEdit(travel)}
        onDeleteTravel={(id: string) => handleDelete(id)}
      />
      {(view === "create" || view === "edit") && (
        <TravelForm
          initialData={selectedTravel}
          onSuccess={handleCloseModal}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
};

export default Travel;
