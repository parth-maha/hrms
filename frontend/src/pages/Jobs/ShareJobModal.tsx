import { useForm, Controller } from 'react-hook-form';
import CommonModal from '../../components/ui/CommonModal';
import TextField from '../../components/ui/TextField';
import { Button } from '@mui/material';
import { useShareJob } from '../../services/queries/job.queries';
import useAuthStore from '../../store/auth.store';
import CircularLoader from '../../components/ui/CircularLoader';

interface ShareJobModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

const ShareJobModal = ({ open, onClose, jobId }: ShareJobModalProps) => {
  const shareMutation = useShareJob(onClose);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '' }
  });
  const {empId} = useAuthStore();

  const onSubmit = (data: { email: string }) => {
    shareMutation.mutate({
      JobId : jobId,
      ShareToEmail: data.email,
      SharedById: empId
    });
  };

  return (
    <CommonModal
      openState={open}
      onClose={onClose}
      title="Share Job"
      sizes={['90%', '50%', '30%', '30%']}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
        <div className="w-full">
            <Controller
            name="email"
            control={control}
            rules={{ 
                required: "Email is required",
                pattern: {
                value: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email address"
                }
            }}
            render={({ field }) => (
                <TextField
                {...field}
                label="Recipient Email"
                errors={errors}
                errorKey="email"
                fullWidth
                />
            )}
            />
        </div>
        
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={onClose} color="error">Cancel</Button>
          <Button 
            type="submit" 
            disabled={shareMutation.isPending}
          >
            {shareMutation.isPending ? <CircularLoader/> : 'Share'}
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export default ShareJobModal;   