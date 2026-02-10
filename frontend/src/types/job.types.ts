
export interface Job {
  id: number;
  position: string;
  yoer : number;
  description: string;
  location: string;
  type: string;
  status: string;
  postedAt: string;
  closeComment: string | null;
  closeReason: string | null;
  selectedCandidateIds: number[];
  companyName: string;
  createdById: number;

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
  position: string;
  description: string;
  yoer : number;
  status: string;
  location: string;
  type: string;
}

export interface JobCardProps {
  job: Job;
  onDelete: (jobId: number) => void;
  onShare: (jobId: number) => void;
  onView: (jobId: number) => void;
  onEdit: (jobId: number) => void;
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

