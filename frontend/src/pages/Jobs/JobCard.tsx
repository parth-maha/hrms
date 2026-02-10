import { Delete, Edit, Close as CloseIcon} from '@mui/icons-material';
import { formatDate, type JobCardProps} from '../../types/job.types';

const JobCard = ({ job, onDelete, onView, onEdit,onShare }: JobCardProps) => {

  return (
    <div
      onClick={() => onView(job.id)}
      className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
      </div>
      <p className="text-gray-700 text-sm line-clamp-2 mb-4">{job.description}</p>

      <p className="text-xs text-gray-400">Posted on {formatDate(job.postedAt)}</p>

        <div className="flex justify-between items-center pt-3">
          <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job.id);
                }}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Edit Job"
              >
                <Edit fontSize="small" />
              </button>
          </div>
          <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(job.id);
                }}
                className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg"
                title="Close Job"
              >
                <CloseIcon fontSize="small" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job.id);
                }}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete Job"
              >
                <Delete fontSize="small" />
              </button>
          </div>
        </div>
    </div>
  );
};

export default JobCard;