using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.DTO;
using hrms_backend.Models.Entities;

namespace hrms_backend.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employees>> GetEmployeesAsync();
        Task UpdateEmployeeAsync(Employees employee);
        Task<Employees?> GetEmployeeByIdAsync(Guid id);
        Task DeleteEmployeeAsync(Employees employee);
        Task<List<ReviewerDto>> GetListOfEmployees();

        Task<List<OrgChartDto>> GetOrgChartAsync();

    }
}
