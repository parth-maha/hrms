using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Travel
{
    [Table("travel_plan")]
    public class TravelPlan
    {
        [Key]
        [Column("pk_travel_id")]
        public Guid Id { get; set;  }

        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set;  }

        [Column("start_date")]
        public DateTime StartDate { get; set; }
        [Column("end_date")]
        public DateTime EndDate { get; set; }


        [ForeignKey("fk_created_by")]
        public Guid CreatedById { get; set; }
        [ForeignKey("CreatedById")]
        public virtual Employees CreatedBy { get; set;  }

        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [Column("deleted_on")]
        public DateTime DeletedOn { get; set; }

        // TRAVEL PLAN -> MANY EXPENSES
        //public virtual ICollection<TravelExpense> TravelExpenses { get; set;  } = new List<TravelExpense>();

        public virtual ICollection<HrTravelDocuments> HrTravelDocuments { get; set; } = new List<HrTravelDocuments>();

        public virtual ICollection<TravelAllocation> TravelAllocation { get; set; } = new List<TravelAllocation>();

    }
}
