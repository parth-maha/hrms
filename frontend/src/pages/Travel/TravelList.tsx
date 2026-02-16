import React, { useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import Button from "../../components/ui/Button";
import EditIcon from "../../components/ui/EditIcon";
import ConfirmBox from "../../components/ui/ConfirmBox";
import DeleteIcon from "../../components/ui/DeleteIcon";
import type { Travel, TravelListProps } from "../../types/travel.types";

const ConfigList: React.FC<TravelListProps> = ({
  onAddTravel,
  onEditTravel,
  onDeleteTravel,
  travels,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteTravel = (travel: Travel) => {
    setShowConfirm(true);
    setSelectedId(travel.id);
  };

  const handleEditTravel = (travel: Travel) => {
    onEditTravel(travel);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      onDeleteTravel(selectedId);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 1, m:0}}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Travels</Typography>
          <Button
            title="Add System Config"
            onClick={onAddTravel}
            variant="contained"
            withPlusIcon={true}
            size="small"
          >
            Create Travel
          </Button>
        </Box>
        <TableContainer className="border border-gray-100 rounded-lg">
          <Table className="w-full">
            <TableHead className="bg-gray-50 border border-gray-200">
              <TableRow>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Name
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Description
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Created By
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Date
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {travels?.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.description}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.createdBy}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.description}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <EditIcon
                      title="Edit"
                      onClick={() => handleEditTravel(row)}
                    />
                    <DeleteIcon
                      title="Delete"
                      onClick={() => handleDeleteTravel(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ConfirmBox
        opened={showConfirm}
        title="Confirm Delete"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        withCloseButton={true}
      >
        Are you sure you want to delete the travel?
      </ConfirmBox>
    </>
  );
};

export default ConfigList;
