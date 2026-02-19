using hrms_backend.Models.Entities;
using hrms_backend.Models.Entities.Games;
using hrms_backend.Models.Entities.Jobs;
using hrms_backend.Models.Entities.Travel;
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

        public DbSet<SystemInfo> SystemInfo { get; set; }
        public DbSet<SystemConfigs> SystemConfigs { get; set; }

        public DbSet<TravelPlan> TravelPlans { get; set; }
        public DbSet<HrTravelDocuments> HrTravelDocuments { get; set; }
        public DbSet<TravelAllocation> TravelAllocation { get; set; }
        public DbSet<TravelExpense> TravelExpenses { get; set; }
        public DbSet<EmployeeTravelDocument> EmployeeTravelDocuments { get; set; }

        // ================== SOCIAL ==================
        //public DbSet<Post> Posts { get; set; }
        //public DbSet<Like> Likes { get; set; }
        //public DbSet<Comment> Comments { get; set; }

        // ================== JOBS ==================
        public DbSet<Jobs> Jobs { get; set; }
        public DbSet<Referrals> Referrals { get; set; }
        public DbSet<JobShared> JobShares { get; set; }
        public DbSet<JobReviewers> JobReviewers { get; set; }

        // ================== GAMES ==================
        public DbSet<GameType> GameType { get; set; }
        public DbSet<GameInterest> GameInterests { get; set; }
        public DbSet<GameSlots> GameSlots { get; set; }
        //public DbSet<GameBooking> GameBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // each config belongs to a system
            modelBuilder.Entity<SystemConfigs>()
                .HasOne(s => s.System)
                .WithMany(s => s.SystemConfigs)
                .HasForeignKey(s => s.SystemId)
                .OnDelete(DeleteBehavior.Restrict);

            // config created by which employee
            modelBuilder.Entity<SystemConfigs>()
                .HasOne(r => r.CreatedBy)
                .WithMany()
                .HasForeignKey(r => r.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== EMPLOYEES ====================
            modelBuilder.Entity<Employees>()
                .HasOne(e => e.Manager)
                .WithMany(e => e.Reports)
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employees>()
                .HasIndex(e => e.EmployeeId)
                .IsUnique();

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

            // Travel Plan -> created by hr
            modelBuilder.Entity<TravelPlan>()
                .HasOne(tp=> tp.CreatedBy)
                .WithMany()
                .HasForeignKey(tp=> tp.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            // when travel plan deleted allocation will also be deleted
            modelBuilder.Entity<TravelAllocation>()
                .HasOne(ta => ta.TravelPlan)
                .WithMany(tp => tp.TravelAllocation)
                .HasForeignKey(ta => ta.TravelId)
                .OnDelete(DeleteBehavior.Cascade);

            // allocation -> employee, cant delete if emp has travel history
            modelBuilder.Entity<TravelAllocation>()
                .HasOne(ta => ta.Employee)
                .WithMany()
                .HasForeignKey(ta => ta.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HrTravelDocuments>()
                .HasOne(ta => ta.TravelPlan)
                .WithMany(d => d.HrTravelDocuments)
                .OnDelete(DeleteBehavior.Cascade);

            // expense belongs to allocation
            modelBuilder.Entity<TravelExpense>()
                .HasOne(te => te.TravelAllocation)
                .WithMany()
                .HasForeignKey(te => te.AllocationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TravelExpense>()
                .HasOne(te => te.ApprovedBy)
                .WithMany()
                .HasForeignKey(te => te.ApprovedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TravelExpense>()
                .HasOne(te => te.EmployeeTravelDocuments)
                .WithOne(doc => doc.TravelExpense)
                .HasForeignKey<EmployeeTravelDocument>(doc => doc.TravelExpenseId)
                .OnDelete(DeleteBehavior.Cascade);

            // ================== JOBS ==================

            // job is posted by a emp
            modelBuilder.Entity<Jobs>()
                .HasOne(j => j.PostedBy)
                .WithMany()
                .HasForeignKey(j => j.PostedById)
                .OnDelete(DeleteBehavior.Restrict);

            // job has a poc
            modelBuilder.Entity<Jobs>()
                .HasOne(j => j.Poc)
                .WithMany()
                .HasForeignKey(j => j.PocId)
                .OnDelete(DeleteBehavior.Restrict);
            
            //job code will be unique 
            modelBuilder.Entity<Jobs>()
                .HasIndex(j => j.JobCode)
                .IsUnique();

            // referrals belong to a job
            modelBuilder.Entity<Referrals>()
                .HasOne(r => r.Job)
                .WithMany(r=> r.Referrals)
                .HasForeignKey(r => r.JobId)
                .OnDelete(DeleteBehavior.Restrict);

            // referral -> employee
            modelBuilder.Entity<Referrals>()
                .HasOne(r => r.RefferedBy)
                .WithMany()
                .HasForeignKey(r => r.ReferralById)
                .OnDelete(DeleteBehavior.Restrict);

            // job share -> job
            modelBuilder.Entity<JobShared>()
                .HasOne(js => js.Job)
                .WithMany(js => js.JobShared)
                .HasForeignKey(js => js.JobId)
                .OnDelete(DeleteBehavior.Cascade);

            // job shared -> employee
            modelBuilder.Entity<JobShared>()
                .HasOne(js => js.SharedBy)
                .WithMany()
                .HasForeignKey(js => js.SharedById)
                .OnDelete(DeleteBehavior.Restrict);

            // Job reviewers -> job 
            modelBuilder.Entity<JobReviewers>()
                .HasOne(jr => jr.Job)
                .WithMany(jr => jr.JobReviewers)
                .HasForeignKey(jr => jr.JobId)
                .OnDelete(DeleteBehavior.Cascade);

            // job reviewers -> employee
            modelBuilder.Entity<JobReviewers>()
                .HasOne(jr => jr.Reviewer)
                .WithMany()
                .HasForeignKey(jr => jr.ReviewerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== GAMES ==================

            modelBuilder.Entity<GameInterest>()
                .HasOne(e => e.Employee)
                .WithMany()
                .HasForeignKey(e => e.EmployeeId);

            modelBuilder.Entity<GameInterest>()
                .HasOne(e => e.GameType)
                .WithMany()
                .HasForeignKey(e => e.GameId);

            modelBuilder.Entity<GameSlots>()
                .HasOne(g => g.Game)
                .WithMany()
                .HasForeignKey(g => g.GameTypeId);

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


            // ====================== FILTERS =======================
            modelBuilder.Entity<Employees>().HasQueryFilter(e => !e.IsDeleted);

            modelBuilder.Entity<Jobs>().HasQueryFilter(j => !j.IsDeleted);
            modelBuilder.Entity<Referrals>().HasQueryFilter(j => !j.IsDeleted);
            modelBuilder.Entity<JobReviewers>().HasQueryFilter(j => !j.IsDeleted);
            modelBuilder.Entity<JobShared>().HasQueryFilter(j => !j.IsDeleted);
            modelBuilder.Entity<SystemConfigs>().HasQueryFilter(s => !s.IsDeleted);
            modelBuilder.Entity<TravelPlan>().HasQueryFilter(t => !t.IsDeleted);
            modelBuilder.Entity<HrTravelDocuments>().HasQueryFilter(t => !t.IsDeleted);
            modelBuilder.Entity<TravelAllocation>().HasQueryFilter(t => !t.IsDeleted);
            modelBuilder.Entity<TravelExpense>().HasQueryFilter(t => !t.IsDeleted);
            modelBuilder.Entity<EmployeeTravelDocument>().HasQueryFilter(t => !t.IsDeleted);

            // indexing on isDeleted
            modelBuilder.Entity<Jobs>()
                .HasIndex(j => j.IsDeleted)
                .HasFilter("[is_deleted] = 0");

            modelBuilder.Entity<SystemConfigs>()
                .HasIndex(s => s.IsDeleted)
                .HasFilter("[is_deleted] =0");

            modelBuilder.Entity<TravelPlan>()
                .HasIndex(s => s.IsDeleted)
                .HasFilter("[is_deleted] =0");

            modelBuilder.Entity<TravelExpense>()
                .HasIndex(t => t.IsDeleted)
                .HasFilter("[is_deleted] =0");
        }
    }
}