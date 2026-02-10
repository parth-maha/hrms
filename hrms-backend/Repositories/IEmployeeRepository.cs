using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.Entities;

namespace hrms_backend.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employees>> GetEmployeesAsync();
        Task UpdateEmployeeAsync(Employees employee);
        public Task<Employees?> GetEmployeeByIdAsync(Guid id);
        Task DeleteEmployeeAsync(Employees employee);
        public Task<List<ReviewerDto>> GetListOfEmployees();
    }
}
