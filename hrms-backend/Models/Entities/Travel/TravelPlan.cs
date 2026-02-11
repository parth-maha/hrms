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
        public String Category { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [ForeignKey("fk_hr_id")]
        public Guid HrId { get; set; }
        public virtual Employees Hr { get; set;  }

        public string description { get; set;  }
        public string Policy { get; set;  }

        // TRAVEL PLAN -> MANY EXPENSES
        public virtual ICollection<TravelExpense> TravelExpenses { get; set;  }

        public virtual ICollection<HrTravelDocuments> HrTravelDocuments { get; set; }

    }
}
