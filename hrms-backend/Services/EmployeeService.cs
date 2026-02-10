using hrms_backend.Data;
using hrms_backend.Models.Constants;
using hrms_backend.Models.dto;
using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.Entities;
using hrms_backend.Models.Entities.Jobs;
using hrms_backend.Repositories;
using hrms_backend.Services.Authorization;
using System.Numerics;

namespace hrms_backend.Services
{
    public class EmployeeService
    {
        private readonly ILogger<EmployeeService> _logger;
        private readonly IEmployeeRepository _employeeRepo;
        public EmployeeService(ILogger<EmployeeService> logger, IEmployeeRepository employeeRepository)
        {
            _logger = logger;
            _employeeRepo = employeeRepository;
        }

        public async Task<IReadOnlyList<EmployeeDto>> GetAllEmployees()
        {
            var employees = await _employeeRepo.GetEmployeesAsync();
            return employees.Select(mapToDto).ToList();
        }

        public async Task<EmployeeDto?> GetEmployeeById(Guid id)
        {
            var emp = await _employeeRepo.GetEmployeeByIdAsync(id);
            if (emp == null) throw new Exception("Employee not found");

            return mapToDto(emp);
        }

        public async Task<IReadOnlyList<ReviewerDto>> GetListOfEmployees()
        {
            return await _employeeRepo.GetListOfEmployees();
        }

        public async Task<EmployeeDto> EditJob(Guid Id, EmployeeDto dto)
        {
            var emp = await _employeeRepo.GetEmployeeByIdAsync(Id);
            if (emp == null) throw new Exception("Employee not found");

            emp.Id = dto.Id;
            emp.Email = dto.Email;
            emp.Dob = dto.Dob;
            emp.JoiningDate = dto.JoiningDate;
            emp.Gender = dto.Gender;
            emp.BankName= dto.BankName;
            emp.BankBranch= dto.BankBranch;
            emp.BankAccNo = dto.BankAccNo;
            emp.BankIFSC = dto.BankIFSC;
            emp.Department = dto.Department;
            emp.AadharNo = dto.AadharNo;
            emp.PanNo = dto.PanNo;
            emp.Position = dto.Position;
            emp.Department = dto.Department;
            emp.BloodGroup = dto.BloodGroup;
            emp.Phone = dto.Phone;

            await _employeeRepo.UpdateEmployeeAsync(emp);

            return mapToDto(emp);
        }

        public async Task DeleteEmployee(Guid id)
        {
            var emp = await _employeeRepo.GetEmployeeByIdAsync(id);
            if (emp == null) throw new Exception("Employee not found");

            await _employeeRepo.DeleteEmployeeAsync(emp);
        }

        private EmployeeDto mapToDto(Employees employee)
        {
            return new EmployeeDto
            {
                Id = employee.Id,
                Name = $"{employee.FirstName} {employee.LastName}",
                EmployeeId = employee.EmployeeId,
                Email = employee.Email,
                Roles = employee.Roles.Role,
                Phone = employee.Phone,
                AadharNo = employee.AadharNo,
                PanNo = employee.PanNo,
                BankName = employee.BankName,
                BankAccNo = employee.BankAccNo,
                BankBranch = employee.BankBranch,
                BankIFSC = employee.BankIFSC,
                BloodGroup = employee.BloodGroup,
                Department = employee.Department,
                Position = employee.Position,
                ManagerId = employee.ManagerId,
                MangerName = $"{employee.Manager?.FirstName} {employee.Manager?.LastName}",
                Dob = employee.Dob,
                JoiningDate = employee.JoiningDate,
                Gender = employee.Gender
            };
        }
    }
}
