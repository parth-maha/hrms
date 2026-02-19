using hrms_backend.Models.DTO.Games;
using hrms_backend.Models.Entities;
using hrms_backend.Services.Games;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hrms_backend.Controllers.Games
{
    [ApiController]
    [Authorize]
    [Route("/api/v1/[controller]")]
    public class GameTypeController : ControllerBase
    {
        private readonly GameTypeService _gameTypeService;

        public GameTypeController(GameTypeService gameTypeService)
        {
            _gameTypeService = gameTypeService;
        }

        [HttpPost]
        public async Task<IActionResult> AddGame(AddGameTypeDto dto)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                await _gameTypeService.AddGame(dto, user.Id);
                return Ok(new { message = "Game Added" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            try
            {
                var games = await _gameTypeService.GetAllGames();
                return Ok(games);

            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteGame(int id)
        {
            try
            {
                var user = (Employees?)HttpContext.Items["User"];
                if (user == null) return Unauthorized(new { message = "Invalid User" });

                await _gameTypeService.DeleteGame(id,user.Id);
                return Ok(new { message = "Game Delete" });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
