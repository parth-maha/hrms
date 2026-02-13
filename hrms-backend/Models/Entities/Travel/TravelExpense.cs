//using hrms_backend.Models.Constants;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace hrms_backend.Models.Entities.Travel
//{
//    [Table("travel_expenses")]
//    public class TravelExpense
//    {
//        [Key]
//        [Column("pk_expense_id")]
//        public Guid Id { get; set; }

//        // related to which employee and travel plan
//        [Column("fk_allocation_id")]
//        public Guid AllocationId { get; set; }
//        [ForeignKey("AllocationId")]
//        public virtual TravelAllocation TravelAllocation { get; set; }

//        // approved by whom
//        [ForeignKey("fk_approved_by")]
//        public Guid? ApprovedById { get; set;  }
//        [ForeignKey("ApprovedById")]
//        public virtual Employees? ApprovedBy { get; set; }
//        [Column("is_approved")]
//        public bool IsApproved { get; set;  }

//        [Column("description")]
//        public string Description { get; set; }

//        [Column("total_expense")]
//        public long TotalAmount { get; set; }

//        [Column("expense_status")]
//        public string Status { get; set; }

//        [Column("category")]
//        public string Category { get; set; } 

//        [Column("expense_date")]
//        public DateTime ExpenseDate { get; set; }

//        [Column("hr_remarks")]
//        public string HrRemarks { get; set; }

//        [Column("is_deleted")]
//        public bool IsDeleted { get; set; }

//        [Column("deleted_on")]
//        public DateTime DeletedOn { get; set; }
//        public virtual ICollection<EmployeeTravelDocument> EmployeeTravelDocuments { get; set;  }

//    }
//}
