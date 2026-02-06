using hrms_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        private  readonly ILogger<ApplicationDbContext> _logger;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ILogger<ApplicationDbContext> logger) : base(options)
        {
            _logger = logger;
        }

        public DbSet<Employees> Employees { get; set; }
    }
}