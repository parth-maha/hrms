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
        public Guid Id { get; set; }

        [Column("fk_expense_id")]
        public Guid? TravelExpenseId { get; set; }
        [ForeignKey("TravelExpenseId")]
        public virtual TravelExpense? TravelExpense { get; set; }

        [Column("expense_type")]
        public string ExpenseType { get; set; }

        [Column("owner_type")]
        public string OwnerType { get; set; }

        [Column("file_name")]
        public string FileName { get; set; }

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
