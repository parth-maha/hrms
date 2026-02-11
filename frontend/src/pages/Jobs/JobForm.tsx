import type { Job, JobFormData } from "../../types/job.types";
import {
  useCreateJob,
  useEmployeeOptions,
  useUpdateJob,
} from "../../services/queries/job.queries";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../components/ui/TextField";
import AutocompleteWoControl from "../../components/ui/AutoCompleteWoControl";
import CircularLoader from "../../components/ui/CircularLoader";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import Tooltip from "../../components/ui/Tooltip";
import { InfoOutlined } from "@mui/icons-material";

interface JobFormProps {
  initialData?: Job;
  onSuccess: () => void;
  onCancel: () => void;
}

const JobForm = ({ initialData, onSuccess, onCancel }: JobFormProps) => {
  const { data: employees = [] } = useEmployeeOptions();

  const createMutation = useCreateJob(onSuccess);
  const updateMutation = useUpdateJob(onSuccess);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormData>({
    defaultValues: {
      Title: "",
      JobCode: "",
      Description: "",
      AttachedFile: "",
      PocId: "",
      Reviewers: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        Title: initialData.title,
        JobCode: initialData.jobCode,
        Description: initialData.description,
        AttachedFile: initialData.attachedFile || "",
        PocId: initialData.pocId,
        Reviewers: initialData.reviewers?.map((r) => r.id) || [],
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: JobFormData) => {
    if (initialData) {
      updateMutation.mutate({ id: initialData.jobId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        {initialData ? "Edit Job" : "Create New Job"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg  border border-gray-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <Controller
              name="Title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Title"
                  errors={errors}
                  errorKey="Title"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="col-span-1">
            <Controller
              name="JobCode"
              control={control}
              rules={{ required: "Job Code is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Code"
                  errors={errors}
                  errorKey="JobCode"
                  disabled={!!initialData}
                  fullWidth
                />
              )}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Controller
              name="Description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  errors={errors}
                  errorKey="Description"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="col-span-1">
            <Controller
              name="PocId"
              control={control}
              rules={{ required: "POC is required" }}
              render={({ field: { onChange, value } }) => (
                <AutocompleteWoControl
                  label="Point of Contact"
                  options={employees.map((e) => e.name)}
                  value={initialData?.pocId}
                  onChange={(_, newValue: any) => onChange(newValue.id)}
                  error={errors.PocId}
                  helperText={errors.PocId?.message}
                />
              )}
            />
          </div>

          <div className="col-span-1">
            <Controller
              name="Reviewers"
              control={control}
              render={({ field: { onChange, value } }) => (
                <AutocompleteWoControl
                  label="Reviewers"
                  multiple={true}
                  options={employees.map((e) => e.name)}
                  value={initialData?.reviewers?.map((m) => m.id)}
                  onChange={(_, newValue: any) =>
                    onChange(newValue.map((v: any) => v.id))
                  }
                  error={errors.Reviewers}
                  helperText={errors.Reviewers?.message}
                />
              )}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Controller
              name="AttachedFile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Document"
                  errors={errors}
                  errorKey="AttachedFile"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              className="bg-blue-600"
            >
              {isLoading ? <CircularLoader /> : "Save Job"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default JobForm;
