using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Jobs
{
    [Table("job_referrals")]
    public class Referrals
    {
        [Key]
        [Column("pk_referral_id")]
        public Guid Id { get; set;  }

        [Column("fk_job_id")]
        public Guid JobId { get; set;  }
        [ForeignKey("JobId")]
        public virtual Jobs Job { get; set;  }

        [Column("referred_by")]
        public Guid ReferralById { get; set; }
        [ForeignKey("ReferredById")]
        public virtual Employees RefferedBy { get; set; }

        [Column("referred_to")]
        public string RefferedTo { get; set;  }

        public string RefferedToEmail { get; set;  }
        public string ReferredToCV { get; set;  }

        public string status { get; set;  }

    }
}
