import type {
  CreateTravelFormData,
  Travel,
  TravelFormProps,
} from "../../types/travel.types";
import useAuthStore from "../../store/auth.store";
import { useCreateTravelByHr } from "../../services/queries/travel.queries";
import CommonModal from "../../components/ui/CommonModal";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import CircularLoader from "../../components/ui/CircularLoader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "../../components/ui/TextField";
import { MenuItem } from "@mui/material";
import { useEmployeeOptions } from "../../services/queries/job.queries";
import { Close, OpenInNew } from "@mui/icons-material";
import { useEffect } from "react";
import IconButton from "../../components/ui/IconButton";
import { formatDate } from "../../types/job.types";

const TravelForm = ({ initialData, onSuccess, onCancel }: TravelFormProps) => {
  const { empId } = useAuthStore();
  const createMutation = useCreateTravelByHr(onSuccess);
  const { data: employees = [] } = useEmployeeOptions();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      employeeIds: [],
      documents: [],
      CreatedBy: empId,
    },
  });

  const documents = watch("documents");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        startDate: formatDate(initialData.startDate),
        endDate: formatDate(initialData.endDate),
        CreatedBy: initialData.createdBy,
        employeeIds: initialData.employeeIds.map((r) => r.id),
        documents: initialData.documents.map((file) => ({
          name: file.fileName,
          url: file.url,
        })),
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: CreateTravelFormData) => {
    if (initialData) {
      createMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending;

  return (
    <CommonModal
      openState
      onClose={onCancel}
      title={initialData ? "Edit Travel" : "Create Travel"}
      sizes={["95%", "90%", "80%", "70%"]}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    errors={errors}
                    errorKey="name"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="col-span-2">
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                }}
                render={({ field }) => (
                  <TextField
                    multiline
                    rows={3}
                    {...field}
                    label="Description"
                    errors={errors}
                    errorKey="description"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="col-span-1">
              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: "Start date is required",
                }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    value={field.value || null}
                    onChange={(date) =>
                      field.onChange(dayjs(date).format("YYYY-MM-DD"))
                    }
                    format="YYYY-MM-DD"
                  />
                )}
              />
            </div>

            <div className="col-span-1">
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: "End Date is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="End Date"
                    errors={errors}
                    errorKey="endDate"
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="col-span-2">
              <Controller
                name="employeeIds"
                control={control}
                rules={{ required: "Employees are required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Employees"
                    errors={errors}
                    errorKey="employees"
                    fullWidth
                  >
                    {employees.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attached Documents
              </label>
              {documents ? (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm text-gray-700 truncate flex-1">
                        {documents.name}
                      </p>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          window.open(documents.url as string, "_blank")
                        }
                        title="View document"
                      >
                        <OpenInNew fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setValue("documents", [])}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove file"
                  >
                    <Close />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOCX (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      multiple
                      type="file"
                      name="documents"
                      className="hidden"
                      onChange={(e) => {
                        setValue("documents", e.target.files);
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onCancel} color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? <CircularLoader /> : "Save"}
            </Button>
          </div>
        </form>
      </LocalizationProvider>
    </CommonModal>
  );
};

export default TravelForm;
