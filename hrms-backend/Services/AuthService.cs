using BCrypt.Net;
using hrms_backend.Data;
using hrms_backend.Helpers;
using hrms_backend.Models.dto;
using hrms_backend.Models.Entities;
using hrms_backend.Services.Authorization;

namespace hrms_backend.Services
{
    public class AuthService
    {
        private readonly ILogger<AuthService> _logger;
        private ApplicationDbContext _context;
        private JwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;

        public AuthService(ILogger<AuthService> logger, ApplicationDbContext context, JwtUtils jwtUtils, AppSettings appSettings)
        {
            _logger = logger;
            _context = context;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings;
        }

        public LoginResponse Login(LoginReqDTO dto, string ipAddress)
        {
            var employee = _context.Employees.SingleOrDefault(x => x.Email == dto.Email);

            if(employee == null && !BCrypt.Net.BCrypt.Verify(dto.Password, employee.Password))
            {
                throw new AppException("Username or password is incorrect");
            }

            var jwtToken = _jwtUtils.GenerateJwtToken(employee);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            employee.RefreshTokens.Add(refreshToken);

            removeOldRefreshTokens(employee);

            _context.Update(employee);
            _context.SaveChanges();

            return new LoginResponse(employee.Id,employee.FirstName,employee.LastName,employee.Roles, jwtToken, refreshToken.Token);
        }
        
        public LoginResponse RefreshToken(string token, string ipAddress)
        {
            var user = getUserByRefreshToken(token);
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);


        }


        //========================= HELPER METHODS =======================
        private void removeOldRefreshTokens(Employees employe)
        {
            // remove old inactive refresh tokens from user based on TTL in app settings
            employe.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(_appSettings.RefreshTokenTTL) <= DateTime.UtcNow);
        }
        private RefreshToken rotateRefreshToken(RefreshToken refreshToken, string ipAddress)
        {
            var newRefreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            revokeRefreshToken(refreshToken, ipAddress);
            return newRefreshToken;
        }

        private void revokeRefreshToken(RefreshToken token, string ipAddress)
        {
            token.Revoked = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
        }
        private Employees getUserByRefreshToken(string token)
        {
            var user = _context.Employees.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                throw new AppException("Invalid token");

            return user;
        }
    }
}
