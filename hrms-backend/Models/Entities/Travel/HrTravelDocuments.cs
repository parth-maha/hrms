using hrms_backend.Models.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Travel
{
    [Table("hr_travel_documents")]
    public class HrTravelDocuments
    {
        [Key]
        [Column("pk_htd_id")]
        public Guid Id { get; set;  }

        [Column("fk_travel_id")]
        public Guid TravelPlanId { get; set;  }
        [ForeignKey("TravelPlanId")]
        public virtual TravelPlan TravelPlan { get; set; }

        public string DocumentName { get; set;  }

        [Column("uploaded_by")]
        public Guid UploadedById { get; set; }
        [ForeignKey("UploadedById")]
        public virtual Employees UploadedBy { get; set; }

        public OwnerType OwnerType { get; set; }

        public string FileName { get; set;  }
        public string Url { get; set; }
        public DateTime UploadedAt { get; set;  }
    }
}
