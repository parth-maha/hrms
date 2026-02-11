using hrms_backend.Data;
using hrms_backend.Models.dto;
using hrms_backend.Models.Entities;
using hrms_backend.Services;
using hrms_backend.Services.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using NLog.Web.LayoutRenderers;

namespace hrms_backend.Controllers
{
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReqDTO dto)
        {
            try
            {
                var ipAddress = IpAddress();
                var response = await _authService.Login(dto, ipAddress);

                SetTokenCookie(response.RefreshToken);

                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest( new {message = ex.Message});
            }
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            var refreshTone = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshTone))
                return BadRequest(new { message = "Token is required" });
             
            try
            {
                var response = _authService.RefreshToken(refreshTone, IpAddress());
                SetTokenCookie(response.RefreshToken);
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("verify")]
        public IActionResult Verify()
        {
            var user = (Employees?)HttpContext.Items["User"];
            if (user == null)
                return Unauthorized(new { message = "Token is invalid or expired" });

            return Ok(new
            {
                employeeId = user.Id.ToString(),
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                role = user.Roles.Role,
                jwtToken = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last()
            });
        }

        [HttpPost("revoke-token")]
        public IActionResult RevokeToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest(new { message = "Token is required" });

            try
            {
                _authService.RevokeToken(refreshToken, IpAddress());
                return Ok(new { message = "Token revoked" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ================= HELPER METHDOS==================
        private void SetTokenCookie(string refreshToken)
        {
            var option = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(15),
                Secure = false,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax
            };
            Response.Cookies.Append("refreshToken", refreshToken, option);
        }

        private string IpAddress()
        {

            return HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString();
        }

    }
}
