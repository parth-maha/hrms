import { useForm, Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import CommonModal from "../../components/ui/CommonModal";
import type { GameFormProps, GameTypeFormData } from "../../types/config.types";

const GameTypeForm = ({ initialData, onSuccess, onCancel }: GameFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GameTypeFormData>({
    defaultValues: initialData || {
      gameName: "",
      gameDuration: 30,
      gameStartTime: "09:00:00",
      gameEndTime: "21:00:00",
      maxMembers: 4,
      noOfSlots: 10,
    },
  });

  const onSubmit = (data: GameTypeFormData) => {
    console.log("Saving Game Config:", data);
    // mutation here
    onSuccess();
  };

  return (
    <CommonModal
      openState
      onClose={onCancel}
      title={initialData ? "Edit Game Logic" : "New Game Configuration"}
      sizes={["90%", "80%", "40%", "40%"]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
          <Typography variant="body2" className="text-blue-700 italic">
            Configure how slots are generated and the maximum capacity per game
            session.
          </Typography>
        </div>

        <Controller
          name="gameName"
          control={control}
          rules={{ required: "Game name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Game Name (e.g. Pool Table)"
              errors={errors}
              fullWidth
            />
          )}
        />

        <Controller
          name="gameDuration"
          control={control}
          rules={{ required: "Duration is required", min: 5 }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Slot Duration (Mins)"
              errors={errors}
              fullWidth
            />
          )}
        />

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
        />

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
        />

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
        />
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100"></div>
        <Button
          onClick={onCancel}
          color="inherit"
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          Save Rules
        </Button>
      </form>
    </CommonModal>
  );
};

export default GameTypeForm;
