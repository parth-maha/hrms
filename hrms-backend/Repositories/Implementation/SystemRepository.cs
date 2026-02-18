using hrms_backend.Data;
using hrms_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class SystemRepository : ISystemRepository
    {
        public readonly ApplicationDbContext _dbContext;

        public SystemRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SystemConfigs>> GetAllConfigsAsync()
        {
            return await _dbContext.SystemConfigs
                .Include(s => s.CreatedBy)
                .ToListAsync();
        }

        public async Task<SystemConfigs?> GetByConfigIdAsync(int configId)
        {
            return await _dbContext.SystemConfigs
                .FirstOrDefaultAsync(s=> s.Id == configId);
        }

        public async Task<SystemConfigs> GetDefaultMail()
        {
            return await _dbContext.SystemConfigs.FirstOrDefaultAsync(s => s.ConfigName == "Default Email");
        }

        public async Task<SystemConfigs> GetHrEmail()
        {
            return await _dbContext.SystemConfigs.FirstOrDefaultAsync(s => s.ConfigName == "Default HR Email");
        }

        public async Task AddSystemConfigAsync(SystemConfigs configs)
        {
            await _dbContext.SystemConfigs.AddAsync(configs);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateConfigAsync(SystemConfigs configs)
        {
            _dbContext.SystemConfigs.Update(configs);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteConfigAsync(SystemConfigs configs)
        {
            _dbContext.SystemConfigs.Update(configs); //soft delete
            await _dbContext.SaveChangesAsync();
        }
    }
}
