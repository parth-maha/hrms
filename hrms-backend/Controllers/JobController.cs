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
        public async Task<IActionResult> CreateJob([FromBody] CreateJobDTO dto)
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
                return BadRequest(new { message = ex.InnerException});
            }
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditJob(Guid id, [FromBody] CreateJobDTO dto)
        {
            try
            {
                var job = await _jobService.EditJob(id, dto);
                return Ok(job);
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            try
            {
                await _jobService.DeleteJob(id);
                return Ok(new {message = "Job Deleted"});
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
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
                return BadRequest(new { message = ex.InnerException });
            }
        }

        [HttpPost("refer")]
        public async Task<IActionResult> ReferJob([FromBody] ReferJobDTO dto)
        {
            try
            {
                await _jobService.ReferJob(dto);
                return Ok(new { message = "Job referred" });
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException });
            }
        }
    } 
}
