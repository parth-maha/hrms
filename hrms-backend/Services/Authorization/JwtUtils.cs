using hrms_backend.Data;
using hrms_backend.Helpers;
using hrms_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace hrms_backend.Services.Authorization
{
    public class JwtUtils
    {
        private readonly AppSettings _appSettings;
        private ApplicationDbContext _applicatioDbContext;

        public JwtUtils (IOptions<AppSettings> appSettings, ApplicationDbContext applicationDbContext)
        {
            _appSettings = appSettings.Value;
            _applicatioDbContext = applicationDbContext;
        }

        public string GenerateJwtToken(Employees employee)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDetails = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("employeeId", employee.Id.ToString())}),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDetails);
            return tokenHandler.WriteToken(token);
        }

        public Guid ValidateJwtToken(string token)
        {
            if (token == null) return Guid.Empty;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                },out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var employeeId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "employeeId").Value);

                return employeeId;
            }
            catch
            {
                return Guid.Empty;
            }

        }

        public RefreshToken GenerateRefreshToken(string ipAddress)
        {
            var refreshToken = new RefreshToken
            {
                Token = getUniqueToken(),
                Expires = DateTime.UtcNow.AddDays(15), // number of days
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };

            return refreshToken;

            string getUniqueToken()
            {
                var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
                // ensure token is unique by checking against db
                var tokenIsUnique = !_applicatioDbContext.Employees.Any(u => u.RefreshTokens.Any(t => t.Token == token));

                if (!tokenIsUnique)
                    return getUniqueToken();

                return token;
            }
        }
    }
}
