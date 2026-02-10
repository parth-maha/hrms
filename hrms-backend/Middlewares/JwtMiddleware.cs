using hrms_backend.Data;
using hrms_backend.Helpers;
using hrms_backend.Services.Authorization;
using Microsoft.Extensions.Options;

namespace hrms_backend.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;
        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, ApplicationDbContext dbContext, JwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateJwtToken(token);

            if (userId != Guid.Empty)
            {
                context.Items["User"] = await dbContext.Employees.FindAsync(userId);
            }

            await _next(context);
        }
    }
}
