
using hrms_backend.Data;
using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.Entities.Jobs;
using hrms_backend.Repositories;

namespace hrms_backend.Services
{
    public class JobService
    {
        private readonly ILogger<JobService> _logger;
        private readonly IJobRepository _jobRepo;

        public JobService(ILogger<JobService> logger, IJobRepository jobRepository)
        {
            _logger = logger;
            _jobRepo = jobRepository;
        }

        public async Task<IReadOnlyList<Jobs>> GetAllJobs()
        {
            return await _jobRepo.GetAllJobsAsync();
        }

        public async Task<Jobs> CreateJob(CreateJobDTO dto, Guid PostedById)
        {
            var job = new Jobs
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                AttachedFile = dto.AttachedFile,
                Description = dto.Description,
                PostedById = PostedById,
                PostedAt = DateTime.Now,
                IsOpen = dto.IsOpen,
                PocId = dto.PocId,
            };

            await _jobRepo.AddJobAsync(job);

            if(dto.ReviewerIds != null && dto.ReviewerIds.Any())
            {
                var reviewers = dto.ReviewerIds.Select(rId => new JobReviewers
                {
                    Id = Guid.NewGuid(),
                    JobId = job.Id,
                    ReviewerId = rId
                }).ToList();

                await _jobRepo.AddJobReviewerAsync(reviewers);
            }

            return job;
        }

        public async Task<Jobs> EditJob(Guid jobId, CreateJobDTO jobDTO)
        {
            var job = await _jobRepo.GetJobByIdAsync(jobId);

            if (job == null) throw new Exception("Job not found" );

            job.Title = jobDTO.Title;
            job.Description = jobDTO.Description;
            job.JobCode = jobDTO.JobCode;
            job.PocId = jobDTO.PocId;
            job.AttachedFile = jobDTO.AttachedFile;
            job.IsOpen = jobDTO.IsOpen;

            await _jobRepo.UpdateJobAsync(job);

            if (jobDTO.ReviewerIds != null && jobDTO.ReviewerIds.Any())
            {
                await _jobRepo.ClearJobReviewersAsync(jobId);

                var reviewers = jobDTO.ReviewerIds.Select(rId => new JobReviewers
                {
                    Id = Guid.NewGuid(),
                    JobId = jobId,
                    ReviewerId = rId
                }).ToList();

                await _jobRepo.AddJobReviewerAsync(reviewers);
            }

            return job;
        }

        public async Task DeleteJob(Guid jobId)
        {
            var job = await _jobRepo.GetJobByIdAsync(jobId);
            if (job == null) throw new Exception("Job not found");

            await _jobRepo.DeleteJobAsync(job);
        }

        public async Task ShareJob(ShareJobDTO dto)
        {
            var share = new JobShared
            {
                Id = Guid.NewGuid(),
                SharedById = dto.SharedById,
                SharedTo = dto.ShareToEmail
            };

            await _jobRepo.AddJobShareAsync(share);
        }

        public async Task ReferJob(ReferJobDTO dto)
        {
            var referral = new Referrals
            {
                Id = Guid.NewGuid(),
                ReferralById = dto.ReferredBy,
                RefferedTo = dto.ToName,
                RefferedToEmail = dto.ToEmail,
                ReferredToCV = dto.ToCvUrl,
                JobId = dto.JobId,
                status = "PENDING"
            };

            await _jobRepo.AddReferralAsync(referral);
        }
    }
}
