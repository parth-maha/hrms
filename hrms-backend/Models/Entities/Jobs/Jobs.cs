using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Jobs
{
    [Table("jobs")]
    public class Jobs
    {
        [Key]
        [Column("pk_job_id")]
        public Guid Id { get; set; }

        [Column("job_id")]
        public string JobCode { get; set; }

        public string Title;

        public string Description { get; set;  }

        [ForeignKey("posted_by")]
        public Guid PostedById { get; set; }
        [ForeignKey("PostedById")]
        public virtual Employees PostedBy { get; set; }

        public DateTime PostedAt { get; set;  }

        public bool IsOpen { get; set; }

        public string AttachedFile { get; set; }

        [ForeignKey("poc")]
        public Guid PocId{ get; set; }
        [ForeignKey("PocId")]
        public virtual Employees Poc{ get; set; }

        public virtual ICollection<Referrals> Referrals { get; set;  } = new List<Referrals>();
        public virtual ICollection<JobShared> JobShared { get; set; } = new List<JobShared>();
        public virtual ICollection<JobReviewers> JobReviewers { get; set; } = new List<JobReviewers>();
    }
}
