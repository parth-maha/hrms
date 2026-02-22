import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import Button from "../../components/ui/Button";
import type { ExpenseFilterProps } from "../../types/travel.types";

const STATUS_OPTIONS = ["PENDING", "APPROVED", "REJECTED"];

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  filters,
  setFilters,
  options,
  onApply,
  onReset,
}) => {
  const selectedEmployee =
    options.employees.find((e) => e.id === filters.employeeId) ?? null;

  const selectedTravel =
    options.travels.find((t) => t.travelId === filters.travelId) ?? null;

  return (
    <div className="h-1/2 flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="col-span-1">
          <Autocomplete
            options={options.employees}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={selectedEmployee}
            onChange={(_, newValue) =>
              setFilters((prev) => ({
                ...prev,
                employeeId: newValue?.id ?? null,
              }))
            }
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Employee" fullWidth />
            )}
          />
        </div>

        <div className="col-span-1">
          <Autocomplete
            options={options.travels}
            getOptionLabel={(option) => option.travelName}
            isOptionEqualToValue={(option, value) => option.travelId === value.travelId}
            value={selectedTravel}
            onChange={(_, newValue) =>
              setFilters((prev) => ({
                ...prev,
                travel: newValue?.travelId ?? null,
              }))
            }
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Travel Plan" fullWidth />
            )}
          />
        </div>

        <div className="col-span-1">
          <Autocomplete
            options={options.categories}
            getOptionLabel={(option) => option}
            value={filters.category || null}
            onChange={(_, newValue) =>
              setFilters((prev) => ({ ...prev, category: newValue ?? null }))
            }
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Category" fullWidth />
            )}
          />
        </div>

        <div className="col-span-1">
          <Autocomplete
            options={STATUS_OPTIONS}
            getOptionLabel={(option) => option}
            value={filters.status || null}
            onChange={(_, newValue) =>
              setFilters((prev) => ({ ...prev, status: newValue ?? null }))
            }
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Status" fullWidth />
            )}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={onReset} color="error">
          Reset
        </Button>
        <Button onClick={onApply} color="success">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ExpenseFilter;