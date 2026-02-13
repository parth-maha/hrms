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
        public Guid TravelId { get; set; }

        public virtual TravelPlan TravelPlan { get; set; }

        [Column("uploaded_by")]
        public Guid UploadedById { get; set; }
        [ForeignKey("UploadedById")]
        public virtual Employees UploadedBy { get; set; }

        [Column("owner_type")]
        public string OwnerType { get; set; }
        [Column("file_name")]
        public string FileName { get; set;  }
        [Column("url")]
        public string Url { get; set; }
        [Column("uploaded_at")]
        public DateTime UploadedAt { get; set; }

        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [Column("deleted_on")]
        public DateTime DeletedOn { get; set; }
    }
}
