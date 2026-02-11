import { useForm, Controller } from 'react-hook-form';
import { useReferJob } from '../../services/queries/job.queries';
import CommonModal from '../../components/ui/CommonModal';
import TextField from '../../components/ui/TextField';
import Button from '../../components/ui/Button';
import CircularLoader from '../../components/ui/CircularLoader';
import useAuthStore from '../../store/auth.store';

interface ReferJobModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

const ReferJobModal = ({ open, onClose, jobId }: ReferJobModalProps) => {
  const {empId} = useAuthStore();
  const referMutation = useReferJob(onClose);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { ToName: '', ToEmail: '', ToCvUrl: '',ReferredBy: empId }
  });

  const onSubmit = (data: any) => {
    referMutation.mutate({
      jobId,
      ...data
    });
  };

  return (
    <CommonModal
      openState={open}
      onClose={onClose}
      title="Refer a Candidate"
      sizes={['90%', '60%', '40%', '40%']}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-5">
        
        <div className="w-full">
            <Controller
              name="ToName"
              control={control}
              rules={{ required: "Candidate Name is required" }}
              render={({ field }) => (
                <TextField {...field} label="Candidate Name" errors={errors} errorKey="toName" fullWidth />
              )}
            />
        </div>

        <div className="w-full">
            <Controller
              name="ToEmail"
              control={control}
              rules={{ 
                required: "Candidate Email is required",
                pattern: {
                    value: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email address"
                }
              }}
              render={({ field }) => (
                <TextField {...field} label="Candidate Email" errors={errors} errorKey="toEmail" fullWidth />
              )}
            />
        </div>

        <div className="w-full">
            <Controller
              name="ToCvUrl"
              control={control}
              rules={{ required: "CV Link is required" }}
              render={({ field }) => (
                <TextField {...field} label="CV Link (URL)" errors={errors} errorKey="toCvUrl" fullWidth />
              )}
            />
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" disabled={referMutation.isPending}>
            {referMutation.isPending ? <CircularLoader/> : 'Refer Candidate'}
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export default ReferJobModal;