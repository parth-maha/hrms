import type { FileItem, TravelFormProps } from "../../types/travel.types";
import useAuthStore from "../../store/auth.store";
import {
  useCreateTravelByHr,
  useUpdateTravel,
} from "../../services/queries/travel.queries";
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
import { Close } from "@mui/icons-material";
import { useEffect } from "react";
import IconButton from "../../components/ui/IconButton";

const TravelForm = ({ initialData, onSuccess, onCancel }: TravelFormProps) => {
  const { empId } = useAuthStore();
  const createMutation = useCreateTravelByHr(onSuccess);
  const updateMutation = useUpdateTravel(onSuccess);
  const { data: employees = [] } = useEmployeeOptions();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
    getValues
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startDate: null as any,
      endDate: null as any,
      employeeIds: [] as string[],
      documents: [] as FileItem[],
      CreatedBy: empId,
    },
    mode : "onBlur"
  });

  const documents = watch("documents");
  const startDate = watch("startDate");
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        startDate: dayjs(initialData.startDate),
        endDate: dayjs(initialData.endDate),
        CreatedBy: initialData.createdBy,
        employeeIds: initialData.employeeIds?.map((e) => e.id) || [],
        documents:
          initialData.documents?.map((file) => ({
            id: file.id,
            fileName: file.fileName,
            url: file.url,
          })) || [],
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: any) => {
    if (initialData) {
      updateMutation.mutate({ id: initialData.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        fileName: file.name,
        file: file,
      }));
      setValue("documents", [...documents, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setValue("documents", updatedDocs);
  };

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
                    label="Travel Name"
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
                rules={{ required: "Description is required" }}
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
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Start Date"
                    disablePast
                    value={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      if(getValues("endDate")){
                        trigger("endDate")
                      }
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message as string,
                      },
                    }}
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
                  validate: (value) => {
                    const start = getValues("startDate")
                    if (!value || !startDate) return true;
                    if (dayjs(value).isBefore(dayjs(start),'day')) {
                      return "End date cannot be before start date";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    label="End Date"
                    value={field.value}
                    minDate={startDate}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message as string,
                      },
                    }}
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
                    label="Assign Employees"
                    errors={errors}
                    errorKey="employeeIds"
                    fullWidth
                    SelectProps={{
                      multiple: true,
                    }}
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

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attached Documents
              </label>

              {documents.length > 0 && (
                <div className="space-y-2 mb-3">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex flex-col min-w-0">
                          {doc.url ? (
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-700 hover:underline truncate font-medium"
                            >
                              {doc.fileName}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-700 truncate font-medium">
                              {doc.fileName}
                            </span>
                          )}
                        </div>
                      </div>
                      <IconButton
                        size="small"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOCX (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    multiple
                    type="file"
                    name="documents"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outlined" onClick={onCancel} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              title="Save Travel Plan"
              variant="contained"
              disabled={isLoading}
              className="bg-blue-600"
            >
              {isLoading ? <CircularLoader /> : "Save"}
            </Button>
          </div>
        </form>
      </LocalizationProvider>
    </CommonModal>
  );
};

export default TravelForm;