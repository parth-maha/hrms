using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Jobs
{
    [Table("job_reviewers")]
    public class JobReviewers
    {
        [Key]
        [Column("pk_job_reviewer_id")]
        public Guid Id { get; set;  }

        [Column("fk_job_id")]
        public Guid JobId { get; set; }
        [ForeignKey("JobId")]
        public virtual Jobs Job { get; set;  }

        [Column("reviewer_id")]
        public Guid ReviewerId { get; set; }
        [ForeignKey("ReviewerId")]
        public virtual Employees Reviewer{ get; set; }
    }
}
