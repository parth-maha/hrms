using hrms_backend.Models.Entities;
using hrms_backend.Repositories;
using static hrms_backend.Models.DTO.SystemDto;

namespace hrms_backend.Services
{
    public class SystemService
    {
        private readonly ISystemRepository _systemRepo;
        private readonly ILogger<SystemService> _logger;

        public SystemService(ISystemRepository systemRepo, ILogger<SystemService> logger)
        {
            _systemRepo = systemRepo;
            _logger = logger;
        }

        public async Task<IReadOnlyList<ConfigDto>> GetAllConfigs()
        {
            var configs = await _systemRepo.GetAllConfigsAsync();
            return configs.Select(mapToDto).ToList();
        }

        public async Task<ConfigDto> AddConfig(AddConfigDto dto,string empId,Guid Id)
        {
            var config = new SystemConfigs
            {
                SystemId = 1,
                ConfigId = dto.ConfigId,
                CreatedById = Id,
                ConfigName = dto.ConfigName,
                ConfigValue = dto.ConfigValue,
            };

            await _systemRepo.AddSystemConfigAsync(config);

            _logger.LogInformation($"Config Created : {config.ConfigName} by {empId}");
            return mapToDto(config);
        }

        public async Task<ConfigDto> UpdateConfig(int id,AddConfigDto dto, string empId)
        {
            var config = await _systemRepo.GetByConfigIdAsync(id);
            if(config == null)
            {
                throw new Exception("Config not found");
            }

            config.ConfigId = dto.ConfigId;
            config.ConfigName = dto.ConfigName;
            config.ConfigValue = dto.ConfigValue;

            await _systemRepo.UpdateConfigAsync(config);
            _logger.LogInformation($"Config Created : {config.ConfigName} by {empId}");
            return mapToDto(config);
        }

        public async Task DeleteConfig(int id, string empId)
        {
            var config = await _systemRepo.GetByConfigIdAsync(id);
            if (config == null) throw new Exception("Config not found");

            config.DeletedOn= DateTime.UtcNow;
            config.IsDeleted = true;
            await  _systemRepo.DeleteConfigAsync(config);
            _logger.LogInformation($"Config Deleted:{config.ConfigName} by {empId}");
        }

        // ========================== HELPER METHOD ========================
        public ConfigDto mapToDto(SystemConfigs config)
        {
            return new ConfigDto
            {
                Id = config.Id,
                CreatedBy = $"{config.CreatedBy.FirstName} {config.CreatedBy.LastName}",
                ConfigId = config.ConfigId,
                ConfigName = config.ConfigName,
                ConfigValue = config.ConfigValue,
            };
        }
    }
}
