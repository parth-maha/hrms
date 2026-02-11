using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        public string Title { get; set; }

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

        [JsonIgnore]
        public virtual ICollection<Referrals> Referrals { get; set;  } = new List<Referrals>();
        [JsonIgnore]
        public virtual ICollection<JobShared> JobShared { get; set; } = new List<JobShared>();
        [JsonIgnore]
        public virtual ICollection<JobReviewers> JobReviewers { get; set; } = new List<JobReviewers>();
    }
}
