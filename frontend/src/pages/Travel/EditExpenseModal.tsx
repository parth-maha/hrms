import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import CommonModal from "../../components/ui/CommonModal";
import Typography from "@mui/material/Typography";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import type { Expense } from "../../types/travel.types";
import { useUpdateExpense } from "../../services/queries/travel.queries";

const EditExpenseModal = ({
  open,
  onClose,
  expense,
}: {
  open: boolean;
  onClose: () => void;
  expense: Expense;
}) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      expenseDate: dayjs(expense.expenseDate),
      proof: null as File | null,
    },
  });

  const updateMutation = useUpdateExpense(onClose);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("amount", data.amount.toString());
    formData.append("category", data.category);
    formData.append("expenseDate", data.expenseDate.format("YYYY-MM-DD"));
    formData.append("proof", data.proof);
    formData.append('expenseType' , data.category)
    updateMutation.mutate({ id: expense.id, formData });
  };

  return (
    <CommonModal openState={open} onClose={onClose} title="Edit Expense">
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-4">
        <div className="space-y-2">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Amount" fullWidth />
            )}
          />
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Description" fullWidth />
            )}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Proof
          </label>
          <Typography variant="caption">
            Current Document: {expense.fileName}
          </Typography>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("proof", file, { shouldValidate: true });
            }}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
          />
          {/* {errors && (
            <p className="text-red-500 text-xs mt-1">Proof is required</p>
          )} */}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Update Expense
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export default EditExpenseModal;
