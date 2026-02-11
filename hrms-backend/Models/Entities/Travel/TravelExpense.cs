using hrms_backend.Models.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Travel
{
    [Table("travel_expenses")]
    public class TravelExpense
    {
        [Key]
        [Column("pk_tr_id")]
         public Guid Id { get; set; }

        [ForeignKey("fk_travel_id")]
        public Guid TravelPlanId { get; set;  }
        [ForeignKey("TravelPlanId")]
        public virtual TravelPlan TravelPlan { get; set; }

        [ForeignKey("fk_approved_by")]
        public Guid ApprovedById { get; set;  }
        [ForeignKey("ApprovedById")]
        public virtual Employees FkApprovedBy { get; set; }

        public long amount { get; set;  }

        [ForeignKey("fk_employee_id")]
        public Guid EmployeeId { get; set; }
        [ForeignKey("ApprovedById")]
        public virtual Employees Employee { get; set; }

        public Status Status { get; set; } 

        public bool IsApproved { get; set;  }
        
        public virtual ICollection<EmployeeTravelDocument> EmployeeTravelDocuments { get; set;  }


    }
}
