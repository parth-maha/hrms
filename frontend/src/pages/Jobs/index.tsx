import { useState } from "react";
import type { Job } from "../../types/job.types";
import usePermissions from "../../hooks/usePermission";
import { useDeleteJob, useJobs } from "../../services/queries/job.queries";
import Loader from "../../components/ui/RequestLoaders";
import JobForm from "./JobForm";
import { Typography } from "@mui/material";
import Button from "../../components/ui/Button";
import JobCard from "./JobCard";
import ConfirmBox from "../../components/ui/ConfirmBox";
import ShareJobModal from "./ShareJobModal";
import ReferJobModal from "./ReferJobModal";

const Jobs = () => {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);

  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [referId, setReferId] = useState<string | null>(null);

  const permissions = usePermissions();
  const { data , isLoading } = useJobs();
  const deleteJob = useDeleteJob();

  const handleCreate = () => {
    setSelectedJob(undefined);
    setView("create");
  };

  const handleEdit = (jobId: string) => {
    const jobToEdit = data?.find((j) => j.jobId === jobId);
    if (jobToEdit) {
      setSelectedJob(jobToEdit);
      setView("edit");
    }
  };

  const handleDelete = () => {
    if (deletedId) {
      deleteJob.mutate(deletedId);
      setDeletedId(null);
    }
  };

  if (isLoading) return <Loader />;

  if (view !== "list") {
    return (
      <JobForm
        initialData={selectedJob}
        onCancel={() => setView("list")}
        onSuccess={() => setView("list")}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-900">
          Job Listings
        </Typography>
        
          <Button
            withPlusIcon
            variant="contained"
            onClick={handleCreate}
          >
            Create Job
          </Button>
      </div>
 
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((job) => (
            <div key={job.jobId} className="relative flex flex-col h-full">
               <JobCard
                  job={{
                      jobId: job.jobId,
                      title: job.title,
                      jobCode : job.jobCode,
                      description: job.description,
                      postedAt: job.postedAt
                  }}
                  onEdit={() =>  handleEdit(job.jobId)}
                  onDelete={() => setDeletedId(job.jobId)}
                  onShare={() =>  setShareId(job.jobId)}
                  onRefer={()=>  setReferId(job.jobId) }
                  onView={() => {}}
               />
               
               {permissions.can('job:refer') && (
                  <Button
                    variant="text"
                    size="small"
                    className="mt-2 w-full"
                    onClick={() => setReferId(job.jobId)}
                  >
                    Refer
                  </Button>
               )}
            </div>
          ))}
        </div>
      ) : (
          <Typography variant="body1" className="text-gray-500">
            No jobs found. Create one to get started.
          </Typography>
      )}
 
      <ConfirmBox
        opened={!!deletedId}
        title="Delete Job"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeletedId(null)}
        withCloseButton={false}
      >
        <Typography>Are you sure you want to delete this job?</Typography>
      </ConfirmBox>
 
      {shareId && (
        <ShareJobModal
          open={!!shareId}
          onClose={() => setShareId(null)}
          jobId={shareId}
        />
      )}
 
      {referId && (
        <ReferJobModal
          open={!!referId}
          onClose={() => setReferId(null)}
          jobId={referId}
        />
      )}
    </div>
  );
};

export default Jobs;