using hrms_backend.Models.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Travel
{
    [Table("employee_travel_documents")]
    public class EmployeeTravelDocument
    {
        [Key]
        [Column("pk_etd_id")]
        public Guid Id { get; set;  }

        [Column("fk_travel_expense_id")]
        public Guid TravelExpenseId { get; set;  }
        [ForeignKey("TravelExpesneId")]
        public virtual TravelExpense TravelExpense { get; set;  }

        public string Description { get; set; }
        public string ExpenseType { get; set;  }

        [Column("uploaded_by")]
        public Guid UploadedById { get; set;  }
        [ForeignKey("UploadedById")]
        public virtual Employees UploadedBy { get; set;  }

        public OwnerType OwnerType { get; set; }

        public string FileName { get; set;  }
        public DateTime UploadedAt { get; set;  }

        public string Url { get; set;  }
    }
}
