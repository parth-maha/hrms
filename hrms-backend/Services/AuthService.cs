using BCrypt.Net;
using hrms_backend.Data;
using hrms_backend.Helpers;
using hrms_backend.Models.dto;
using hrms_backend.Models.Entities;
using hrms_backend.Services.Authorization;
using Microsoft.Extensions.Options;

namespace hrms_backend.Services
{
    public class AuthService
    {
        private readonly ILogger<AuthService> _logger;
        private ApplicationDbContext _context;
        private JwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        private readonly EmailService _emailService;

        public AuthService(ILogger<AuthService> logger, ApplicationDbContext context, JwtUtils jwtUtils,IOptions<AppSettings> appSettings,EmailService emailService)
        {
            _logger = logger;
            _context = context;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
            _emailService= emailService;
        }

        public async Task<LoginResponse> Login(LoginReqDTO dto, string ipAddress)
        {
            var employee = _context.Employees.SingleOrDefault(x => x.Email == dto.Email);

            if(employee == null && !BCrypt.Net.BCrypt.Verify(dto.Password, employee.Password))
            {
                throw new AppException("Invalid username or password");
            }

            var jwtToken = _jwtUtils.GenerateJwtToken(employee);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            employee.RefreshTokens.Add(refreshToken);

            removeOldRefreshTokens(employee);

            _context.Update(employee);
            _context.SaveChanges();

            // send mail
            await _emailService.QueueEmailAsync(
                    employee.Email,
                    "New Login Detected",
                    $"Login detected from IP : {ipAddress} at {DateTime.UtcNow}"
                );

            _logger.LogInformation($"Email sent:{employee.Email} - Refresh Token Added : {refreshToken}");

            return new LoginResponse(employee.Id.ToString(),employee.FirstName,employee.LastName,employee.Email,employee.Roles.ToString(), jwtToken, refreshToken.Token);
        }
        
        public LoginResponse RefreshToken(string token, string ipAddress)
        {
            var employee = getUserByRefreshToken(token);
            var refreshToken = employee.RefreshTokens.Single(x => x.Token == token);

            if (refreshToken.IsRevoked)
            {
                // revoke prev tokens in case this token is compromised
                revokeDescendantRefreshTokens(refreshToken, employee, ipAddress);
                _context.Update(employee);
                _context.SaveChanges();
            }

            if (!refreshToken.IsActive)
                throw new AppException("Invalid token");

            var newToken = rotateRefreshToken(refreshToken,ipAddress);
            employee.RefreshTokens.Add(newToken);
            
            removeOldRefreshTokens(employee);

            _context.Update(employee);
            _context.SaveChanges();

             var jwtToken = _jwtUtils.GenerateJwtToken(employee);

            return new LoginResponse(employee.Id.ToString(), employee.FirstName, employee.LastName, employee.Email, employee.Roles.ToString(), jwtToken, refreshToken.Token);
        }

        public void RevokeToken(string token, string ipAddress)
        {
            var user = getUserByRefreshToken(token);
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (!refreshToken.IsActive)
                throw new AppException("Invalid token");

            // revoke token and save
            revokeRefreshToken(refreshToken, ipAddress);
            _context.Update(user);
            _context.SaveChanges();
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


        private void revokeDescendantRefreshTokens(RefreshToken refreshToken, Employees employee, string ipAddress)
        {
            // recursively traverse the refresh token chain and ensure all prev tokens are revoked
            if (!string.IsNullOrEmpty(refreshToken.ReplacedByToken))
            {
                var childToken = employee.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken.ReplacedByToken);
                if (childToken.IsActive)
                    revokeRefreshToken(childToken, ipAddress);
                else
                    revokeDescendantRefreshTokens(childToken, employee, ipAddress);
            }
        }
    }
}
