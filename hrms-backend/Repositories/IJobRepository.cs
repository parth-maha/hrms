using hrms_backend.Models.Entities.Jobs;

namespace hrms_backend.Repositories
{
    public interface IJobRepository
    {
        Task<List<Jobs>> GetAllJobsAsync();
        Task<Jobs?> GetJobByIdAsync(Guid Id);
        Task AddJobAsync(Jobs job);
        Task DeleteJobAsync(Jobs job);
        Task UpdateJobAsync(Jobs job);

        Task AddJobReviewerAsync(List<JobReviewers> reviwers);
        Task ClearJobReviewersAsync(Guid Id);

        Task AddReferralAsync(Referrals referral);
        Task AddJobShareAsync(JobShared share);
    }
}
