import { useForm, Controller } from "react-hook-form";
import { Typography, MenuItem, Link } from "@mui/material";
import CommonModal from "../../components/ui/CommonModal";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import CircularLoader from "../../components/ui/CircularLoader";
import { useUpdateExpenseStatus } from "../../services/queries/travel.queries";
import type { Expense } from "../../types/travel.types";
import { formatDate } from "../../types/job.types";

interface Props {
  open: boolean;
  onClose: () => void;
  expense: Expense;
}

const ExpenseApprovalModal = ({ open, onClose, expense }: Props) => {
  const updateMutation = useUpdateExpenseStatus(onClose);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: expense.status === "PENDING" ? "APPROVED" : expense.status,
      remarks: expense.hrRemarks || "",
    },
  });

  const selectedStatus = watch("status");

  const onSubmit = (data: any) => {
    updateMutation.mutate({
      id: expense.id,
      data: {
        status: data.status,
        remarks: data.remarks,
      },
    });
  };

  return (
    <CommonModal
      openState={open}
      onClose={onClose}
      title="Expense Approval"
      sizes={["90%", "80%", "50%", "40%"]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="rounded-lg space-y-2">
          <div className="flex justify-between">
            <Typography variant="body2" color="textSecondary">
              Employee
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {expense.employeeName}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" color="textSecondary">
              Date
            </Typography>
            <Typography variant="body2">
              {formatDate(expense.expenseDate)}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" color="textSecondary">
              Amount
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              ₹{expense.amount.toLocaleString()}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" color="textSecondary">
              Description
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              {expense.description}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography variant="body2">Proof:</Typography>
            <Link
              href={expense.document}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center "
            >
              View{" "}
            </Link>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <div>
            <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                //   disabled={expense.status !== "PENDING"}
              >
                <MenuItem value="APPROVED">Approve</MenuItem>
                <MenuItem value="REJECTED">Reject</MenuItem>
              </TextField>
            )}
          />
          </div>
          <div>
            {selectedStatus === "REJECTED" && (
            <Controller
              name="remarks"
              control={control}
              rules={{ required: "Remarks are required for rejection" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rejection Remarks"
                  multiline
                  rows={2}
                  fullWidth
                  errorKey="remarks"
                  errors={errors}
                />
              )}
            />
          )}
          </div>
          <div>
            {selectedStatus === "APPROVED" && (
            <Controller
              name="remarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Remarks"
                  multiline
                  rows={2}
                  fullWidth
                />
              )}
            />
          )}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} color="inherit">
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending}
            className={
              selectedStatus === "REJECTED"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600"
            }
          >
            {updateMutation.isPending ? <CircularLoader /> : "Submit"}
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export default ExpenseApprovalModal;
