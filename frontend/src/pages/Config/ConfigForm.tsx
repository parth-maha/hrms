import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import CircularLoader from "../../components/ui/CircularLoader";
import useAuthStore from "../../store/auth.store";
import type { Config, ConfigFormData } from "../../types/config.types";
import {
  useCreateConfig,
  useUpdateConfig,
} from "../../services/queries/config.queries";
import { useEffect } from "react";
import CommonModal from "../../components/ui/CommonModal";

interface ConfigFormProps {
  initialData?: Config;
  onSuccess: () => void;
  onCancel: () => void;
}

const ConfigForm = ({ initialData, onSuccess, onCancel }: ConfigFormProps) => {
  const { empId } = useAuthStore();
  const createMutation = useCreateConfig(onSuccess);
  const updateMutataion = useUpdateConfig(onSuccess);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ConfigId: "",
      ConfigName: "",
      ConfigValue: "",
      CreatedBy: empId,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ConfigId: initialData.configId,
        ConfigName: initialData.configName,
        ConfigValue: initialData.configValue,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: ConfigFormData) => {
    if (initialData) {
      updateMutataion.mutate({ id: initialData.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutataion.isPending;
  return (
    <CommonModal
      openState
      onClose={onCancel}
      title={initialData ? "Edit Config" : "Add Config"}
      sizes={["75%", "75%", "30%", "30%"]}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-5"
      >
        <div className="w-full">
          <Controller
            name="ConfigId"
            control={control}
            rules={{ required: "Config Id is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Config Id"
                errors={errors}
                errorKey="configName"
                fullWidth
              />
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="ConfigName"
            control={control}
            rules={{
              required: "Config name is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Config name"
                errors={errors}
                errorKey="configName"
                fullWidth
              />
            )}
          />
        </div>

        <div className="w-full">
          <Controller
            name="ConfigValue"
            control={control}
            rules={{
              required: "Config value is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Config Value"
                errors={errors}
                errorKey="configValue"
                fullWidth
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel} color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularLoader /> : "Confirm"}
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export default ConfigForm;
