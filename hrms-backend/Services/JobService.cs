
using hrms_backend.Data;
using hrms_backend.Models.Entities.Jobs;

namespace hrms_backend.Services
{
    public class JobService
    {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;

        public JobService(ILogger logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        //public async Task<IReadOnlyList<Jobs>> GetAllJobs()
        //{
        //    var jobs = _dbContext.Jobs.FindAsync();
        //}
    }
}
