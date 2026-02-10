import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Button from '../../components/ui/Button';
import JobCard from './JobCard';
import JobForm from './JobForm';
import api from '../../services/axios';
import type { Job, JobFormData } from '../../types/job.types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/ui/RequestLoaders';
import { usePermissions } from '../../hooks/usePermission';

const JobsPage = () => {
  const [ jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const permissions = usePermissions()
  
  
  // job creation or update
  const handleJobSave = async (data: JobFormData) => {
    try {
      if (editingJobId) {
        const response = await api.put(`/jobs/${editingJobId}`, data);
        toast.success(response.data.message || 'Job updated successfully');
      } else {
        const response = await api.post("/jobs", data);
        toast.success(response.data.message || 'Job created successfully');
      }
      setEditingJobId(null);
      setCreating(false);
      fetchJobs();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
  };

  // Handle job deletion
  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await api.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      toast.success(response.data.message || 'Job deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete job');
    }
  };


  const handleViewJob = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };

  // Handle edit
  const handleEditJob = (jobId: number) => setEditingJobId(jobId);

  // Conditional rendering
  if (loading) {
    return (
      <Loader/>
    );
  }

  if (editingJobId || creating) {
    const editingJob = jobs.find((job) => job.id === editingJobId);
    return (
      <JobForm
        jobId={editingJobId || undefined}
        initialData={editingJob}
        onCancel={() => {
          setEditingJobId(null);
          setCreating(false);
        }}
        onSuccess={handleJobSave}
      />
    );
  }

  return (
    <Box className="max-w-7xl mx-auto">
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="font-bold text-gray-900">
          Job Listings
        </Typography>
        {permissions.can('job:create') && (
          <Button
            id="create-job"
            variant="contained"
            onClick={() => setCreating(true)}
            size="medium"
          >
            + Create Job
          </Button>
        )}
      </Box>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onShare={}
              onDelete={handleDeleteJob}
              onView={handleViewJob}
              onEdit={handleEditJob}
            />
          ))}
        </div>
      ) : (
        <Typography variant="body1" className="text-center text-gray-600">
          No jobs available.
        </Typography>
      )}
    </Box>
  );
};

export default JobsPage;