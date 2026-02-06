using hrms_backend.Data;
using hrms_backend.Services.Authorization;

namespace hrms_backend.Services
{
    public class EmployeeService
    {
        private readonly ILogger<EmployeeService> _logger;
        private ApplicationDbContext _applicationDbContext;
        private JwtUtils _jwtUtils;
        public EmployeeService(ILogger<EmployeeService> logger, ApplicationDbContext applicationDbContext,JwtUtils jwtUtils)
        {
            _logger = logger;
            _applicationDbContext = applicationDbContext
        }


    }
}
