using hrms_backend.Models.Entities;
using hrms_backend.Models.Entities.Jobs;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ILogger<ApplicationDbContext> _logger;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ILogger<ApplicationDbContext> logger) : base(options)
        {
            _logger = logger;
        }

        public DbSet<Employees> Employees { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Roles> Roles { get; set; }

        // ================== SOCIAL ==================
        //public DbSet<Post> Posts { get; set; }
        //public DbSet<Like> Likes { get; set; }
        //public DbSet<Comment> Comments { get; set; }

        // ================== TRAVEL ==================
        //public DbSet<TravelPlan> TravelPlans { get; set; }
        //public DbSet<TravelExpense> TravelExpenses { get; set; }
        //public DbSet<EmployeeTravelDocument> TravelDocuments { get; set; }
        //public DbSet<HrTravelDocuments> HrTravelDocuments { get; set; }

        // ================== JOBS ==================
        public DbSet<Jobs> Jobs { get; set; }
        public DbSet<Referrals> Referrals { get; set; }
        public DbSet<JobShared> JobShares { get; set; }
        public DbSet<JobReviewers> JobReviewers { get; set; }

        // ================== GAMES ==================
        //public DbSet<GameType> GameTypes { get; set; }
        //public DbSet<GameBooking> GameBookings { get; set; }
        //public DbSet<GameSlots> GameSlots { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ================== EMPLOYEES ====================
            modelBuilder.Entity<Employees>()
                .HasOne(e => e.Manager)
                .WithOne()
                .HasForeignKey<Employees>(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== SOCIAL ======================

            //modelBuilder.Entity<Like>()
            //    .HasOne(l => l.Post)
            //    .WithMany(p => p.Likes)
            //    .HasForeignKey(l => l.PostId)
            //    .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Like>()
            //    .HasOne(l => l.LikedBy)
            //    .WithMany()
            //    .HasForeignKey(l => l.LikedBy)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Comment>()
            //    .HasOne(c => c.CommentedBy)
            //    .WithMany()
            //    .HasForeignKey(c => c.EmployeeId)
            //    .OnDelete(DeleteBehavior.Restrict);

            // ================== TRAVEL ==================

            //modelBuilder.Entity<TravelExpense>()
            //    .HasOne(t => t.Employee)
            //    .WithMany()
            //    .HasForeignKey(t => t.EmployeeId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<TravelExpense>()
            //    .HasOne(t => t.FkApprovedBy)
            //    .WithMany()
            //    .HasForeignKey(t => t.ApprovedById)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<TravelPlan>()
            //    .HasOne(tp => tp.Hr)
            //    .WithMany()
            //    .HasForeignKey(tp => tp.HrId)
            //    .OnDelete(DeleteBehavior.Restrict); 

            // ================== JOBS ==================

            //modelBuilder.Entity<Jobs>()
            //    .HasOne(j => j.PostedBy)
            //    .WithMany()
            //    .HasForeignKey(j => j.PostedById)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Jobs>()
            //    .HasOne(j => j.Poc)
            //    .WithMany()
            //    .HasForeignKey(j => j.PocId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Referrals>()
            //    .HasOne(r => r.RefferedBy)
            //    .WithMany()
            //    .HasForeignKey(r => r.RefferedBy)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Referrals>()
            //    .HasOne(r => r.Job)
            //    .WithMany(j => j.Referrals)
            //    .HasForeignKey(r => r.JobId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<JobShared>()
            //    .HasOne(js => js.SharedBy)
            //    .WithMany()
            //    .HasForeignKey(js => js.SharedById)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<JobReviewers>()
            //    .HasOne(jr => jr.Reviewer)
            //    .WithMany()
            //    .HasForeignKey(jr => jr.ReviewerId)
            //    .OnDelete(DeleteBehavior.Restrict);

            // ================== GAMES ==================

            //modelBuilder.Entity<GameBooking>()
            //    .HasOne(gb => gb.BookedBy)
            //    .WithMany()
            //    .HasForeignKey(gb => gb.BookedById)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<GameSlots>()
            //    .HasOne(gs => gs.Member)
            //    .WithMany()
            //    .HasForeignKey(gs => gs.MemberId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}