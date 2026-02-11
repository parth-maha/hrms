using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.Entities;
using hrms_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly JobService _jobService;

        public JobController(JobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobs = await _jobService.GetAllJobs();
            return Ok(jobs);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateJob([FromForm] CreateJobDTO dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                var job = await _jobService.CreateJob(dto, user.Id);
                return Ok(new {message = "Job created"});
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message});
            }
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditJob(Guid id, [FromForm] CreateJobDTO dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                var job = await _jobService.EditJob(id, dto,user.EmployeeId);
                return Ok(job);
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                await _jobService.DeleteJob(id,user.EmployeeId);
                return Ok(new {message = "Job Deleted"});
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("share")]
        public async Task<IActionResult> ShareJob([FromBody]ShareJobDTO dto)
        {
            if (dto == null) throw new Exception("Empty data");
            try { 
                await _jobService.ShareJob(dto);
                return Ok(new { message = "Job shared successfully" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("refer")]
        public async Task<IActionResult> ReferJob([FromForm] ReferJobDTO dto)
        {
            if(dto.ToCv == null || dto.ToCv.Length == 0)
            {
                return BadRequest("File not selected or is empty.");
            }
            try
            {
                await _jobService.ReferJob(dto);
                return Ok(new { message = "Job referred" });
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    } 
}
