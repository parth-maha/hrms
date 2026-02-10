using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Jobs
{
    [Table("job_shares")]
    public class JobShared
    {
        [Key]
        [Column("pk_job_share_id")]
        public Guid Id { get; set;  }

        [Column("fk_job_id")]
        public Guid JobId { get; set;  }
        [ForeignKey("JobId")]
        public virtual Jobs Job { get; set;  }

        [Column("shared_by")]
        public Guid SharedById { get; set;  }
        [ForeignKey("SharedById")]
        public virtual Employees SharedBy { get; set;}

        public string SharedTo{ get; set; }
    }
}
