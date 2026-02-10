using hrms_backend.Data;
using hrms_backend.Models.Entities.Jobs;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class JobRepository : IJobRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public JobRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Jobs>> GetAllJobsAsync()
        {
            return await _dbContext.Jobs
                .Include(j => j.PostedBy)
                .Include(j => j.Poc)
                .OrderByDescending(j=> j.PostedAt)
                .ToListAsync();
        }

        public async Task<Jobs?> GetJobByIdAsync(Guid Id)
        {
            return await _dbContext.Jobs
                .Include(j => j.JobReviewers)
                .Include(j => j.PostedBy)
                .Include(j => j.Poc)
                .FirstOrDefaultAsync(j => j.Id == Id);
        }

        public async Task AddJobAsync(Jobs job)
        {
            await _dbContext.AddAsync(job);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteJobAsync(Jobs job)
        {
            _dbContext.Remove(job);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateJobAsync(Jobs job)
        {
            _dbContext.Update(job);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddJobReviewerAsync(List<JobReviewers> reviewers)
        {
            await _dbContext.AddRangeAsync(reviewers);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ClearJobReviewersAsync(Guid Id)
        {
            var reviewers = await _dbContext.Jobs.Where(j => j.Id == Id).ToListAsync();
            _dbContext.RemoveRange(reviewers);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddReferralAsync(Referrals referrals)
        {
            await _dbContext.Referrals.AddAsync(referrals);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddJobShareAsync(JobShared share)
        {
            await _dbContext.JobShares.AddAsync(share);
            await _dbContext.SaveChangesAsync();
        }
     }
}
