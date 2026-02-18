
using hrms_backend.Data;
using hrms_backend.Models.Constants;
using hrms_backend.Models.dto;
using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.Entities.Jobs;
using hrms_backend.Repositories;
using hrms_backend.Services.CloudinaryService;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Services
{
	public class JobService
	{
		private readonly ILogger<JobService> _logger;
		private readonly IJobRepository _jobRepo;
		private readonly EmailService _emailService;
		private readonly CloudinaryServiceImpl _cloudinaryService;
		public JobService(ILogger<JobService> logger, IJobRepository jobRepository, EmailService emailService,CloudinaryServiceImpl cloudinaryServiceImpl)
		{
			_logger = logger;
			_jobRepo = jobRepository;
			_emailService = emailService;
			_cloudinaryService = cloudinaryServiceImpl;
		}

		public async Task<IReadOnlyList<JobDto>> GetAllJobs()
		{
			var jobs = await _jobRepo.GetAllJobsAsync();
			return jobs.Select(mapToDto).ToList();
		}

		public async Task<Jobs> CreateJob(CreateJobDTO dto, Guid PostedById)
		{
			string fileUrl="";
			if(dto.AttachedFile != null)
			{
				var result = await _cloudinaryService.UploadDocument(dto.AttachedFile);
				fileUrl = result.Url;
			}
			var job = new Jobs
			{
				Id = Guid.NewGuid(),
				Title = dto.Title,
				AttachedFile = fileUrl,
				JobCode = dto.JobCode,
				Description = dto.Description,
				PostedById = PostedById,
				PostedAt = DateTime.Now,
				PocId = dto.PocId
			};

			await _jobRepo.AddJobAsync(job);

			if (dto.ReviewerIds != null && dto.ReviewerIds.Any())
			{
				var reviewers = dto.ReviewerIds.Select(rId => new JobReviewers
				{
					Id = Guid.NewGuid(),
					JobId = job.Id,
					ReviewerId = rId
				}).ToList();

				await _jobRepo.AddJobReviewerAsync(reviewers);
			}
			_logger.LogInformation($"Job Created - JobId : {job.Id},Title: {job.Title}, PostedBy: {job.PostedBy.FirstName} {job.PostedBy.LastName}");
			return job;
		}

		public async Task<JobDto> EditJob(Guid jobId, CreateJobDTO jobDTO, string empId)
		{
			var job = await _jobRepo.GetJobByIdAsync(jobId);

			if (job == null) throw new Exception("Job not found");

            string fileUrl = "";
            if (jobDTO.AttachedFile != null)
            {
                var result = await _cloudinaryService.UploadDocument(jobDTO.AttachedFile);
                fileUrl = result.Url;
            }else if (jobDTO.AttachedFile==null)
			{
				job.AttachedFile = null;
			}

				job.Title = jobDTO.Title;
			job.Description = jobDTO.Description;
			job.JobCode = jobDTO.JobCode;
			job.PocId = jobDTO.PocId;
			job.AttachedFile = fileUrl;

			await _jobRepo.UpdateJobAsync(job);

			if (jobDTO.ReviewerIds != null)
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
			_logger.LogInformation($"Job Editted -JobId : {job.Id},Title: {job.Title}, EdiitedBy : ${empId}");
			return mapToDto(job);
		}

		public async Task DeleteJob(Guid id, string empId)
		{
			var job = await _jobRepo.GetJobByIdAsync(id);
			if (job == null) throw new Exception("Job not found");

			job.IsDeleted = true;
			job.DeletedOn = DateTime.Now;  // soft delete
			await _jobRepo.DeleteJobAsync(job);
			_logger.LogInformation($"Job Deleted. JobId : {job.Id},Title: {job.Title}, Deleted By: ${empId}");
		}

		public async Task ShareJob(ShareJobDTO dto)
		{
			var share = new JobShared
			{
				Id = Guid.NewGuid(),
				SharedById = dto.SharedById,
				SharedTo = dto.ShareToEmail,
				JobId = dto.JobId,
				SharedTime = DateTime.UtcNow
			};

			await _jobRepo.AddJobShareAsync(share);

			var job = await _jobRepo.GetJobByIdAsync(dto.JobId);
			var email = new EmailDto
			{
				ToEmail = share.SharedTo,
				Subject = $"{job.Title}",
				Body = $"New Job shared by {share.SharedBy.FirstName} {share.SharedBy.LastName} for the role {job.Title}",
				Type = EmailType.SHARE_JOB
			};

			await _emailService.SendEmailAsync(email);
			_logger.LogInformation($"Job Shared. JobId : {job.JobCode},ShareTo: {share.SharedTo}, SharedBy: ${share.SharedBy.EmployeeId}");
		}

		public async Task ReferJob(ReferJobDTO dto)
		{ 
			var result = await _cloudinaryService.UploadDocument(dto.ToCv);
			var referral = new Referrals
			{
				Id = Guid.NewGuid(),
				ReferralById = dto.ReferredBy,
				RefferedTo = dto.ToName,
				RefferedToEmail = dto.ToEmail,
				ReferredToCV = result.Url,
				JobId = dto.JobId,
				status = "PENDING"
			};

			await _jobRepo.AddReferralAsync(referral);

			var job = await _jobRepo.GetJobByIdAsync(dto.JobId);
			var email = new EmailDto
			{
				ToEmail = referral.RefferedToEmail,
				Subject = $"Referral for {job.Title}",
				Body = $"Hi {referral.RefferedTo}, You were referred to a job at Roima.Below are the given details. \n\nReferred By:{referral.RefferedBy.EmployeeId} - {referral.RefferedBy.FirstName} {referral.RefferedBy.LastName}\n Job Code:{job.JobCode} \n Title: {job.Title}.",
				Type = EmailType.REFERRAL,
				cc = job.JobReviewers.Select(r => r.Reviewer.Email).ToList()
			};

			await _emailService.SendEmailAsync(email);
			_logger.LogInformation($"Job Referred. JobId : {referral.JobId},ShareTo: {referral.RefferedToEmail}, ReferrdBy: ${referral.RefferedBy.FirstName} {referral.RefferedBy.LastName}");
		}

		private JobDto mapToDto(Jobs job)
		{
			return new JobDto
			{
				JobId = job.Id,
				Title = job.Title,
				Description = job.Description,
				PocId = job.PocId,
				PocName = $"{job.Poc.FirstName} {job.Poc.LastName}",
				JobCode = job.JobCode,
				PostedAt = job.PostedAt,
				AttachedFile = job.AttachedFile,
				Reviewers = job.JobReviewers.Select(jr => new ReviewerDto
				{
					Id = jr.ReviewerId,
					Name = $"{jr.Reviewer.FirstName} {jr.Reviewer.LastName}"
				}).ToList(),
			};
		}
	}
}
