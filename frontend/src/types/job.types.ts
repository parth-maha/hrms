
export interface Job {
  jobId: string;
  title: string;
  jobCode : string
  description : string
  pocId? : string;
  pocName? : string;
  postedAt? : string | undefined;
  attachedFile? : string;
  reviewers? : { id : string;name : string;}[];
}

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export interface JobFormData {
  Title: string;
  JobCode : string
  Description : string
  PocId : string;
  AttachedFile? : File | null | string;
  Reviewers : string[];
}

export interface ShareJobDTO{
  JobId : string;
  ShareToEmail :String;
  SharedById : string | null;
}

export interface ReferJobDTO{
  JobId: string;
  ToName : string;
  ToCv : File;
  ToEmail : string;
  ReferredBy : string;
}

export interface EmployeeOption{
  id: string;
  name : string;
}

export interface JobCardProps {
  job: Job;
  onDelete: (jobId: string) => void;
  onShare: (jobId: string) => void;
  onView: (jobId: string) => void;
  onEdit: (jobId: string) => void;
  onRefer : (jobId : string) => void;
}

export interface JobFormProps {
  jobId?: number;
  initialData?: Job;
  onSuccess: (data: JobFormData) => Promise<void>;
  onCancel?: () => void;
}


export interface ApplicationFormProps {
  open: boolean;
  job: Job;
  onClose: () => void;
}

