import type { Job, JobFormData, JobFormProps } from "../../types/job.types";
import {
  useCreateJob,
  useEmployeeOptions,
  useUpdateJob,
} from "../../services/queries/job.queries";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../components/ui/TextField";
import CircularLoader from "../../components/ui/CircularLoader";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { MenuItem } from "@mui/material";
import { Close } from "@mui/icons-material";

const JobForm = ({ initialData, onSuccess, onCancel }: JobFormProps) => {
  const { data: employees = [] } = useEmployeeOptions();

  const createMutation = useCreateJob(onSuccess);
  const updateMutation = useUpdateJob(onSuccess);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<JobFormData>({
    defaultValues: {
      Title: "",
      JobCode: "",
      Description: "",
      AttachedFile: null,
      PocId: "",
      Reviewers: [],
    },
  });

  const attachedFile = watch("AttachedFile");

  useEffect(() => {
    if (initialData) {
      reset({
        Title: initialData.title,
        JobCode: initialData.jobCode,
        Description: initialData.description,
        AttachedFile: initialData.attachedFile || null,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 bg-white rounded-lg  "
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
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Point of contact"
                errors={errors}
                errorKey="PocId"
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

        <div className="col-span-1">
          <Controller
            name="Reviewers"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Reviewers"
                errors={errors}
                errorKey="Reviewers"
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

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attached Document
          </label>

          {attachedFile ? (
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex flex-col min-w-0">
                  <a
                    href={
                      typeof attachedFile === "string"
                        ? attachedFile
                        : URL.createObjectURL(attachedFile)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate"
                  >
                    {typeof attachedFile==='string'
                    ? attachedFile.split('/').pop()
                    :attachedFile.name }
                  </a>
                </div>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => setValue("AttachedFile", "")}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Remove file"
              >
                <Close />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX (MAX. 5MB)</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("AttachedFile", file, { shouldValidate: true });
                    }
                  }}
                />
              </label>
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
          <Button color="error" onClick={onCancel}>
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
  );
};

export default JobForm;
