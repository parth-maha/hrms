using hrms_backend.Models.Entities;
using hrms_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static hrms_backend.Models.DTO.SystemDto;

namespace hrms_backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SystemController : ControllerBase
    {
        private readonly SystemService _systemService;
        public SystemController(SystemService systemService) 
        {
            _systemService = systemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var configs = await _systemService.GetAllConfigs();
                return Ok(configs);
            }catch (Exception ex)
            {
                return BadRequest(new {message = ex.InnerException?.Message ?? ex.Message});
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateConfig([FromBody] AddConfigDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                var config = await _systemService.AddConfig(dto, user.EmployeeId,user.Id);
                return Ok(new { message = "Config created" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditConfig(int id, [FromBody] AddConfigDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                var config = await _systemService.UpdateConfig(id, dto, user.EmployeeId);
                return Ok(config);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConfig(int id)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                await _systemService.DeleteConfig(id, user.EmployeeId);
                return Ok(new { message = "Config Deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
