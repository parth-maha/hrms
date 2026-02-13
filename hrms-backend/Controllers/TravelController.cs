using hrms_backend.Models.DTO.Travel;
using hrms_backend.Models.Entities;
using hrms_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class TravelController : ControllerBase  
    {
        private readonly TravelService _travelService;

        public TravelController(TravelService travelService)
        {
            _travelService = travelService;
        }

        [HttpPost("plan")]
        public async Task<IActionResult> CreatePlan([FromForm] CreateTravelPlanDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                await _travelService.CreatePlan(dto, user.Id);
                return Ok(new { message = "Travel Plan Created" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyPlans()
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                var plans = await _travelService.GetMyPlans(user.Id);
                return Ok(plans);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllTravelPlans()
        {
            try
            { 
                var plans = await _travelService.GetAllPlans();
                return Ok(plans);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
