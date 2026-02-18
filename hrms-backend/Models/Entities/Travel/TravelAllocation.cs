using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Travel
{
    [Table("travel_allocations")]
    public class TravelAllocation
    {
        [Key]
        [Column("pk_ta_id")]
        public Guid Id { get; set; }

        [Column("fk_travel_id")]
        public Guid TravelId { get; set; }
        public virtual TravelPlan TravelPlan { get; set; }

        [Column("fk_employee_id")]
        public Guid EmployeeId { get; set; }
        public virtual Employees Employee { get; set; }

        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [Column("deleted_on")]
        public DateTime DeletedOn { get; set; }
    }
}
