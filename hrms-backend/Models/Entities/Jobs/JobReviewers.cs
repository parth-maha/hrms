using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public virtual Jobs Job { get; set;  }

        [Column("deleted_on")]
        public DateTime DeletedOn { get; set; }

        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [Column("reviewer_id")]
        public Guid ReviewerId { get; set; }
        [ForeignKey("ReviewerId")]
        public virtual Employees Reviewer{ get; set; }
    }
}
