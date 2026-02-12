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
import type { Config, ConfigListProps } from "../../types/config.types";
import Button from "../../components/ui/Button";
import EditIcon from "../../components/ui/EditIcon";
import { Delete } from "@mui/icons-material";
import IconButton from "../../components/ui/IconButton";
import ConfirmBox from "../../components/ui/ConfirmBox";

const ConfigList: React.FC<ConfigListProps> = ({
  onAddConfig,
  onEditConfig,
  onDeleteConfig,
  configs,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const handleDeleteConfig = (config: Config) => {
    setShowConfirm(true);
    setSelectedId(config.Id);
  };

  const handleEditConfig = (config: Config) => {
    onEditConfig(config);
  };

  const handleConfirmDelete = () => {
    onDeleteConfig(selectedId);
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
          <Typography variant="h4">Configs</Typography>
          <Button
            onClick={onAddConfig}
            id="addEmp"
            variant="contained"
            withPlusIcon={true}
            size="small"
          >
            Config
          </Button>
        </Box>
        <TableContainer className="border border-gray-100 rounded-lg">
          <Table className="w-full">
            <TableHead className="bg-gray-50 border border-gray-200">
              <TableRow>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Id
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Config Id
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Config Name
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Config Value
                  </Typography>
                </TableCell>
                <TableCell sx={{ paddingY: "10px" }}>
                  <Typography fontWeight={600} variant="body2">
                    Created By
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
              {configs?.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.id} </Typography> 
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.configId}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.configName}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.configValue}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <Typography>{row.createdBy}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: "4px" }}>
                    <EditIcon
                      title="Edit"
                      onClick={() => handleEditConfig(row)}
                    />
                    <IconButton onClick={() => handleDeleteConfig(row)}>
                      <Delete />
                    </IconButton>
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
        Are you sure you want to change the branch status?
      </ConfirmBox>
    </>
  );
};

export default ConfigList;
