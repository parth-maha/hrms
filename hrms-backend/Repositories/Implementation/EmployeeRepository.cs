using hrms_backend.Data;
using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public EmployeeRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Employees>> GetEmployeesAsync()
        {
            return await _dbContext.Employees
                .Include(e=> e.Roles)
                .ToListAsync();
        }

        public async Task<List<ReviewerDto>> GetListOfEmployees()
        {
            return await _dbContext.Employees
                .Select(e => new ReviewerDto
                {
                    Id = e.Id,
                    Name = $"{e.FirstName} {e.LastName}"
                }).ToListAsync();
        }

        public async Task<Employees?> GetEmployeeByIdAsync(Guid id)
        {
            return await _dbContext.Employees.Include(e => e.Roles).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task UpdateEmployeeAsync(Employees employee)
        {
            _dbContext.Employees.Update(employee);
             await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(Employees employee)
        {
            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
        }
    }
}
