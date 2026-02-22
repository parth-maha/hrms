import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import CommonModal from "../../components/ui/CommonModal";
import type { GameFormData, GameFormProps } from "../../types/config.types";
import { useAddGame } from "../../services/queries/config.queries";

const GameTypeForm = ({ initialData, onSuccess, onCancel }: GameFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormData>({
    defaultValues: initialData || {
      gameName: "Pool Table",
      duration: 60,
      gameStartTime: "10:00:00",
      gameEndTime: "22:00:00",
      maxMembers: 4,
    },
  });
  const addGame = useAddGame();
  const onSubmit = (data: GameFormData) => {

    const payload = {
      ...data,
      gameStartTime: `${data.gameStartTime}`,
      gameEndTime: `${data.gameEndTime}`,
      duration: Number(data.duration),
      maxMembers: Number(data.maxMembers),
    };
    addGame.mutate(payload);
    onSuccess();
  };

  return (
    <CommonModal
      openState
      onClose={onCancel}
      title={initialData ? "Edit Game" : "New Game "}
      sizes={["90%", "80%", "40%", "40%"]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Controller
              name="gameName"
              control={control}
              rules={{ required: "Game name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Game Name"
                  errors={errors}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="grid-cols-2">
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Duration is required", min: 5 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Duration(mins)'
                  type="number"
                  errors={errors}
                  fullWidth
                />
              )}
            /></div>
          <div className="grid-cols-1">
            <Controller
              name="maxMembers"
              control={control}
              rules={{ required: "Max players required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Max Players/Slot"
                  errors={errors}
                  fullWidth
                />
              )}
            /></div>
          <div className="grid-cols-1">
            <Controller
              name="gameStartTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="time"
                  label="Start Time"
                  InputLabelProps={{ shrink: true }}
                  errors={errors}
                  fullWidth
                />
              )}
            /></div>
          <div className="grid-cols-1">
            <Controller
              name="gameEndTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="time"
                  label="End Time"
                  InputLabelProps={{ shrink: true }}
                  errors={errors}
                  fullWidth
                />
              )}
            /></div>
        </div>
        <div className="flex justify-end gap-3 pt-6">
          <Button
            onClick={onCancel}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 px-8 text-white"
          >
            {initialData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export default GameTypeForm;