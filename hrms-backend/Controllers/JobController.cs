using hrms_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Controllers
{
    [Authorize]
    public class JobController : ControllerBase
    {
        private readonly JobService _jobService;

        public JobController(JobService jobService)
        {
            _jobService = jobService;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllJobs()
        //{
        //    try
        //    {
        //        var response = _jobService.GetAll();
        //        return Ok(response);
        //    }catch(Exception e)
        //    {
        //        return BadRequest(new { message = "Failed to fetch jobs" });
        //    }
        //}
    }
}
