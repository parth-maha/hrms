import React from "react";
import { MenuItem, TextField } from "@mui/material";
import Button from "../../components/ui/Button";

interface ExpenseFilterProps {
  filters: {
    employee: string;
    travel: string;
    category: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    employee : string;
    travel :string;
    category : string;
    status: string
  }>>
  options: {
    employees: { id: string; name: string }[];
    travels: { id: string; name: string }[];
    categories: string[];
  };
  onApply: () => void;
  onReset: () => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  filters,
  setFilters,
  options,
  onApply,
  onReset,
}) => {
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev: any) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="h-1/2 flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="col-span-1">
          <TextField
            select
            fullWidth
            label="Employee"
            value={filters.employee || ""}
            onChange={handleChange("employee")}
            variant="outlined"
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            {options.employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>
          {filters.employee}
        </div>
        <div className="col-span-1">
          <TextField
            select
            fullWidth
            label="Travel Plan"
            value={filters.travel || ""}
            onChange={handleChange("travel")}
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            {options.travels.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-span-1">
          <TextField
            select
            fullWidth
            label="Category"
            value={filters.category}
            onChange={handleChange("category")}
            size="small"
          >
            <MenuItem value="">All Categories</MenuItem>
            {options.categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-span-1">
          <TextField
            select
            fullWidth
            label="Status"
            value={filters.status}
            onChange={handleChange("status")}
            size="small"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="APPROVED">APPROVED</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
          </TextField>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={onReset} color="error">Reset</Button>
        <Button onClick={onApply} color="success">Apply Filters</Button>
      </div>
    </div>
  );
};

export default ExpenseFilter;
