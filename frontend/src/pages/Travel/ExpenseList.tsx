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
import { useExpenses } from "../../services/queries/travel.queries";
import useAuthStore from "../../store/auth.store";
import { formatDate } from "../../types/job.types";
import type { Expense } from "../../types/travel.types";
import usePermissions from "../../hooks/usePermission";
import { useState } from "react";
import ExpenseApprovalModal from "./ExpenseApprovalModal";
import EditIcon from "../../components/ui/EditIcon";
import EditExpenseModal from "./EditExpenseModal";
import Loader from "../../components/ui/RequestLoaders";
import IconButton from "../../components/ui/IconButton";
import { Visibility } from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

const ExpenseList = () => {
  const { roles } = useAuthStore();
  const permissions = usePermissions();
  const { data: expenses = [], isLoading } = useExpenses(roles === "HR");
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const grouped = expenses.reduce((acc: any, exp: Expense) => {
    (acc[exp.travelName] = acc[exp.travelName] || []).push(exp);
    return acc;
  }, {});

  if (isLoading) return <Loader />;

  return (
    <div>
      {Object.keys(grouped).map((travelName) => (
        <div className="p-1 mt-2">
          <Typography variant="h6" className="mb-3 font-semibold text-black">
            {travelName}
          </Typography>
          <TableContainer className="border border-gray-300 h-30">
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <TableHead className="bg-gray-50 border border-gray-200">
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      Category
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      Proof
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} variant="body2">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontWeight={600}
                      sx={{ paddingLeft: "10px" }}
                      variant="body2"
                    >
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grouped[travelName].map((exp: any) => (
                  <TableRow
                    key={exp.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell>{formatDate(exp.expenseDate)}</TableCell>
                    <TableCell>{exp.category}</TableCell>
                    <TableCell className="font-bold">₹{exp.amount}</TableCell>
                    <TableCell
                      sx={{
                        width: "20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip title={exp.description}>
                        {exp.description}
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {exp.document ? (
                        <Link href={exp.document} target="_blank">
                          View File
                        </Link>
                      ) : (
                        "No File"
                      )}
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
                        <EditIcon
                          title="Edit expense"
                          fontSize="small"
                          onClick={() => setEditingExpense(exp)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {selectedExpense && (
                  <ExpenseApprovalModal
                    open={!!selectedExpense}
                    onClose={() => setSelectedExpense(null)}
                    expense={selectedExpense}
                  />
                )}
                {editingExpense && (
                  <EditExpenseModal
                    open={!!editingExpense && !selectedExpense}
                    onClose={() => setEditingExpense(null)}
                    expense={editingExpense}
                  />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
      {expenses.length === 0 && (
        <Typography align="center" color="textSecondary">
          No expenses found.
        </Typography>
      )}
    </div>
  );
};

export default ExpenseList;
