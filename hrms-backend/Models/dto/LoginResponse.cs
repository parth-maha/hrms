using System.Text.Json.Serialization;

namespace hrms_backend.Models.dto
{
    public class LoginResponse
    {
        public LoginResponse(string employeeId, string firstName, string lastName, string email, string role, string jwtToken, string refreshToken)
        {
            EmployeeId = employeeId;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Role = role;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }

        public string EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }
    }
}
