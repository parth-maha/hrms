using hrms_backend.Data;
using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.DTO;
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
                .Include(e => e.Roles)
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

        public async Task<List<OrgChartDto>> GetOrgChartAsync()
        {
            var employees = await _dbContext.Employees
                .Select(e => new
                {
                    e.Id,
                    Name = e.FirstName + " " + e.LastName,
                    Position = e.Position,
                    e.ManagerId
                })
                .ToListAsync();

            var lookup = new Dictionary<Guid, OrgChartDto>();

            foreach (var emp in employees)
            {
                lookup[emp.Id] = new OrgChartDto
                {
                    Id = emp.Id,
                    Name = emp.Name,
                    Position = emp.Position
                };
            }

            var rootNodes = new List<OrgChartDto>();

            foreach (var emp in employees)
            {
                if (lookup.TryGetValue(emp.Id, out var employeeDto))
                {
                    if (emp.ManagerId == null)
                    {

                        rootNodes.Add(employeeDto);
                    }
                    else
                    {

                        if (lookup.TryGetValue(emp.ManagerId.Value, out var managerDto))
                        {
                            managerDto.DirectReports.Add(employeeDto);
                        }
                    }
                }
            }

            return rootNodes;
        }

        public async Task DeleteEmployeeAsync(Employees employee)
        {
            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
        }
    }
}