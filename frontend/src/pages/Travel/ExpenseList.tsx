import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Link,
  Tooltip,
} from "@mui/material";
import { useExpenses, useFilteredExpenses, useTravelList } from "../../services/queries/travel.queries";
import useAuthStore from "../../store/auth.store";
import { formatDate } from "../../types/job.types";
import type { Expense, ExpenseListProps } from "../../types/travel.types";
import usePermissions from "../../hooks/usePermission";
import { useMemo, useState } from "react";
import ExpenseApprovalModal from "./ExpenseApprovalModal";
import EditIcon from "../../components/ui/EditIcon";
import EditExpenseModal from "./EditExpenseModal";
import Loader from "../../components/ui/RequestLoaders";
import IconButton from "../../components/ui/IconButton";
import { Visibility } from "@mui/icons-material";
import Filter from "../../components/ui/Filter";
import ExpenseFilter from "./ExpenseFilter";
import { useEmployeeOptions } from "../../services/queries/job.queries";

const ExpenseList = ({ isFilterOpen, setIsFilterOpen }: ExpenseListProps) => {
  const { roles } = useAuthStore();
  const permissions = usePermissions();

  const [filters, setFilters] = useState({
    employeeId: null as string | null,
    travelId: null as string | null,
    category: null as string | null,
    status: null as string | null,
  });

  const [activeFilters, setActiveFilters] = useState<any>(null);

  const { data: initialExpenses = [], isLoading: isInitialLoading } = useExpenses(
    roles === "HR" && !activeFilters
  );

  const { data: filteredData, isLoading: isFilterLoading } = useFilteredExpenses(
    activeFilters,
    !!activeFilters
  );

  const { data: employeeOptions = [] } = useEmployeeOptions();
  const { data: travelList = [] } = useTravelList();
  
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const options = useMemo(() => ({
    employees: employeeOptions,
    travels: travelList,
    categories: ["FOOD", "MISCELLANEOUS", "COMMUTE", "STAY"]
  }), [employeeOptions, travelList]);

  const displayData = activeFilters ? (filteredData || []) : initialExpenses;

  const handleApply = () => {
    setActiveFilters({ ...filters });
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    const resetValues = { employeeId: null, travelId: null, category: null, status: null };
    setFilters(resetValues);
    setActiveFilters(null);
    setIsFilterOpen(false);
  };

  const grouped = useMemo(() => {
    return (displayData as any[]).reduce((acc: any, exp: any) => {
      (acc[exp.travelName] = acc[exp.travelName] || []).push(exp);
      return acc;
    }, {});
  }, [displayData]);

  if (isInitialLoading || isFilterLoading) return <Loader />;

  return (
    <div className="p-2">
      <Filter opened={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <ExpenseFilter
          filters={filters}
          setFilters={setFilters}
          options={options}
          onApply={handleApply}
          onReset={handleReset}
        />
      </Filter>

      {Object.keys(grouped).length > 0 ? (
        Object.keys(grouped).map((travelName) => (
          <div key={travelName} className="p-1 mt-2">
            <Typography variant="h6" className="mb-3 font-semibold text-black">
              {travelName}
            </Typography>
            <TableContainer className="border border-gray-300 h-40">
              <Table size="small" sx={{ tableLayout: "fixed" }}>
                <TableHead className="bg-gray-50 border border-gray-200">
                  <TableRow>
                    <TableCell><Typography fontWeight={600} variant="body2">Date</Typography></TableCell>
                    <TableCell><Typography fontWeight={600} variant="body2">Category</Typography></TableCell>
                    <TableCell><Typography fontWeight={600} variant="body2">Amount</Typography></TableCell>
                    <TableCell><Typography fontWeight={600} variant="body2">Description</Typography></TableCell>
                    <TableCell><Typography fontWeight={600} variant="body2">Proof</Typography></TableCell>
                    <TableCell><Typography fontWeight={600} variant="body2">Status</Typography></TableCell>
                    <TableCell><Typography fontWeight={600} variant="body2" sx={{ paddingLeft: "10px" }}>Action</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grouped[travelName].map((exp: any) => (
                    <TableRow key={exp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell>{formatDate(exp.expenseDate)}</TableCell>
                      <TableCell>{exp.category}</TableCell>
                      <TableCell className="font-bold">₹{exp.amount}</TableCell>
                      <TableCell sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        <Tooltip title={exp.description}><span>{exp.description}</span></Tooltip>
                      </TableCell>
                      <TableCell>
                        {exp.document ? (
                          <Link href={exp.document} target="_blank">View File</Link>
                        ) : "No File"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={exp.status}
                          size="small"
                          color={
                            exp.status === "APPROVED"
                              ? "success"
                              : exp.status === "REJECTED"
                              ? "error"
                              : "warning"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {permissions.can("expense:approve") && (
                          <IconButton title="Expense approval" onClick={() => setSelectedExpense(exp)}>
                            <Visibility fontSize="small" />
                          </IconButton>
                        )}
                        {exp.status === "PENDING" && (
                          <EditIcon title="Edit expense" fontSize="small" onClick={() => setEditingExpense(exp)} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      ) : (
        <Typography align="center" color="textSecondary" className="mt-10">
          No expenses found.
        </Typography>
      )}

      {selectedExpense && (
        <ExpenseApprovalModal
          open={!!selectedExpense}
          onClose={() => setSelectedExpense(null)}
          expense={selectedExpense}
        />
      )}
      {editingExpense && (
        <EditExpenseModal
          open={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          expense={editingExpense}
        />
      )}
    </div>
  );
};

export default ExpenseList;