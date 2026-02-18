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
                if (user == null) throw new Exception("User not found");
                await _travelService.CreatePlan(dto, user.Id);
                return Ok(new { message = "Travel Plan Created" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPut("plan/{id}")]
        public async Task<IActionResult> UpdatePlan(Guid id, [FromForm] CreateTravelPlanDto dto)
        {
            try
            {
                var user = (Employees ?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });
                await _travelService.UpdatePlan(id,dto, user.Id);
                return Ok(new { message = "Travel Plan Updated" });
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTravel(Guid id, [FromForm] CreateTravelPlanDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                await _travelService.UpdatePlan(id, dto, user.Id);
                return Ok(new { message = "Travel Plan Updated" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelPlan(Guid id)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                await _travelService.DeleteTravelPlan(id,user.Id);
                return Ok(new { message= "Travel Plan Delete" });
            }catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("expenses")]
        public async Task<IActionResult> AddExpense([FromForm] AddExpenseDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });
                await _travelService.AddExpense(dto, user.Id);
                return Ok(new { message = "Expense added" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPut("expenses/status/{id}")]
        public async Task<IActionResult> UpdateExpenseStatus(Guid id, UpdateExpenseStatusDto dto)
        {
            var user = (Employees?)HttpContext.Items["User"];
            if (user == null) return Unauthorized(new { message = "Invalid User" });
            await _travelService.UpdateExpenseStatus(id, dto, user.Id);
            return Ok(new { message = "Expense Status Updated" });
        }

        [HttpGet("expenses/my")]
        public async Task<IActionResult> GetMyExpenses()
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                var expenses = await _travelService.GetMyExpenses(user.Id);

                return Ok(expenses);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpGet("expenses/all")]
        public async Task<IActionResult> GetAllExpenses()
        {
            var expenses = await _travelService.GetAllExpenses();
            return Ok(expenses);
        }

        [HttpPut("expenses/{id}")]
        public async Task<IActionResult> UpdateTravelExpense(Guid id, AddExpenseDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                await _travelService.UpdateExpense(id, dto, user.Id);
                return Ok(new { message = "Travel Expense Udpated" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
