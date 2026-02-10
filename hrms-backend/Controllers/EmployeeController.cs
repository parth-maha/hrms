using hrms_backend.Models.dto;
using hrms_backend.Models.Entities;
using hrms_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async  Task<IActionResult> GetEmployeeById()
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                return Ok(await _employeeService.GetEmployeeById(user.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetListOfEmployees()
        {
            try
            {
                var list = await _employeeService.GetListOfEmployees();
                return Ok(list);
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var employees =await _employeeService.GetAllEmployees();
                return Ok(employees);
            }catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException});
            }
        }

        [HttpPut("/{id}")]
        public async Task<IActionResult> UpdateEmployee(Guid id, [FromBody] EmployeeDto dto)
        {
            try
            {
                var emp = await _employeeService.EditJob(id, dto);
                return Ok(emp);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            try
            {
                await _employeeService.DeleteEmployee(id);
                return Ok(new { message = "Employee Deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException});
            }
        }
    }
}
