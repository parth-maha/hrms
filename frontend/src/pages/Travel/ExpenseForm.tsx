import { useForm, Controller } from "react-hook-form";
import { MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAddExpenseMutation } from "../../services/queries/travel.queries";
import CommonModal from "../../components/ui/CommonModal";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import CircularLoader from "../../components/ui/CircularLoader";
import type { ExpenseFormProps } from "../../types/travel.types";
import dayjs from "dayjs";

const CATEGORIES = ["FOOD", "COMMUTE", "STAY", "MISCELLANEOUS"];

const ExpenseForm = ({ open, onClose, initialTravel }: ExpenseFormProps) => {
  const { mutateAsync, isPending } = useAddExpenseMutation(onClose);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      travelId: initialTravel?.id,
      description: "",
      amount: null,
      category: "",
      expenseDate: null,
      expenseType: "REIMBURSEMENT",
      proof: null as File | null,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  return (
    <CommonModal
      openState={open}
      onClose={onClose}
      title="Submit Expenses"
      sizes={["90%", "80%", "70%", "60%"]}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <div className="rounded-sm mb-4  p-2">
            <div className="flex justify-end"></div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="col-span-1">
                <Controller
                  name={`amount`}
                  control={control}
                  rules={{
                    validate: (value) =>
                      Number(value) < 5000 || "Value must be less than 5000",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      errors={errors}
                      errorKey="Amount"
                      label="Amount"
                      type="number"
                      fullWidth
                    />
                  )}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <Controller
                  name={`category`}
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Category"
                      errors={errors}
                      fullWidth
                    >
                      {CATEGORIES.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <input
                  type="file"
                  required
                  className=" p-2 border-dashed border block w-full text-sm"
                  onChange={(e) => setValue("proof", e.target.files)}
                />
              </div>
              <div className="col-span-2">
                <Controller
                  name={`description`}
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={2}
                      label="Description"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  name={`expenseDate`}
                  control={control}
                  rules={{ required: "Expense date is required" ,validate: (value) => {
                    if (!value) return true;
                    if (dayjs(value).isAfter(dayjs(initialTravel?.endDate).add(10,'day'),'day')) {
                      return "You cannot submit expense after 10 days";
                    }
                    return true;
                  },}}
                  render={({ field }) => (
                    <DatePicker
                      minDate={dayjs(initialTravel?.startDate)}
                      maxDate={dayjs(initialTravel?.endDate)}
                      {...field}
                      label="Date"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex mt-2 justify-end">
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? <CircularLoader /> : "Submit"}
            </Button>
          </div>
        </form>
      </LocalizationProvider>
    </CommonModal>
  );
};

export default ExpenseForm;
