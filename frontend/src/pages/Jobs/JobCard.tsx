import { Delete, Edit } from "@mui/icons-material";
import { formatDate, type JobCardProps } from "../../types/job.types";
import Button from "../../components/ui/Button";
import usePermissions from "../../hooks/usePermission";

const JobCard = ({
  job,
  onDelete,
  onView,
  onEdit,
  onShare,
  onRefer,
}: JobCardProps) => {
  const permissions = usePermissions();
  return (
    <div
      onClick={() => onView(job.jobId)}
      className="bg-white border border-gray-300 rounded-xl hover:shadow-sm transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
    >
      <div className="items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <h4 className="text-sm font-light text-gray-900">{job.jobCode}</h4>
      </div>
      <p className="text-gray-700 text-sm line-clamp-2 mb-4">
        {job.description}
      </p>
      <p className="text-xs text-gray-400">
        Posted on {formatDate(job.postedAt)}
      </p>
      <div className="flex justify-between items-center pt-3">
        <div className="flex">
          {permissions.can("job:edit") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job.jobId);
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
              title="Edit Job"
            >
              <Edit fontSize="small" />
            </button>
          )}
          {permissions.can("job:delete") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job.jobId);
              }}
              className="p-1.5 text-red-500 hover:bg-blue-50 rounded-lg"
              title="Edit Job"
            >
              <Delete fontSize="small" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {permissions.can("job:share") && (
            <Button
              variant="contained"
              color="success"
              onClick={(e) => {
                e.stopPropagation();
                onShare(job.jobId);
              }}
            >
              Share
            </Button>
          )}
          {permissions.can("job:refer") && (
            <Button
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onRefer(job.jobId);
              }}
            >
              Refer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
