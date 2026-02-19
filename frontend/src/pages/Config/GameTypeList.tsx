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
import type {
  Game,
  GameListProps,
} from "../../types/config.types";
import Button from "../../components/ui/Button";
import EditIcon from "../../components/ui/EditIcon";
import ConfirmBox from "../../components/ui/ConfirmBox";
import DeleteIcon from "../../components/ui/DeleteIcon";

const GameTypeList: React.FC<GameListProps> = ({
  onAdd,
  onEdit,
  onDelete,
  games,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteConfig = (game: Game) => {
    setShowConfirm(true);
    setSelectedId(game.id);
  };

  const handleEditConfig = (game: Game) => {
    onEdit(game);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 1 }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Games</Typography>
          <Button
            title="Add System Config"
            onClick={onAdd}
            variant="contained"
            size="small"
          >
            Add Game
          </Button>
        </Box>
        <TableContainer className="border border-gray-100 rounded-lg">
          <Table className="w-full">
            <TableHead className="bg-gray-50 border border-gray-200">
              <TableRow>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Game Name
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Max Members
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    No of Slots
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Time
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Duration
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
              {games?.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.gameName}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.maxMembers}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.noOfSlots}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Box>
                      <Typography>{row.gameStartTime}</Typography>
                      <Typography>{row.gameEndTime}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.duration}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <EditIcon
                      title="Edit"
                      onClick={() => handleEditConfig(row)}
                    />
                    <DeleteIcon
                      title="Delete"
                      onClick={() => handleDeleteConfig(row)}
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
        Are you sure you want to delete the game?
      </ConfirmBox>
    </>
  );
};

export default GameTypeList;
