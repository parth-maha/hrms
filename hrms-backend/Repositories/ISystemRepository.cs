using hrms_backend.Models.Entities;

namespace hrms_backend.Repositories
{
    public interface ISystemRepository
    {
        Task<List<SystemConfigs>> GetAllConfigsAsync();
        Task UpdateConfigAsync(SystemConfigs config);
        Task <SystemConfigs?> GetByConfigIdAsync(int id);
        Task AddSystemConfigAsync(SystemConfigs config);
        Task DeleteConfigAsync(SystemConfigs configs);
    }
}
