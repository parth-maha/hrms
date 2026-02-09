using hrms_backend.Models.Constants;
using hrms_backend.Models.Entities.Travel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities
{
    [Table("employees")]
    public class Employees
    {
        [Key]
        [Column("pk_employee_id")]
        public Guid Id { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required,MaxLength(50)]
        public string LastName { get; set; }

        [Required,EmailAddress(ErrorMessage ="Enter a valid email address")]
        public string Email { get; set; }

        public string Password { get; set; }

        [Required]
        public Roles Roles { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime Dob { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime JoiningDate;

        [Required]
        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public string? PanNo { get; set; }


        public string? AadharNo { get; set; }

        public string? BloodGroup { get; set; }

        [ForeignKey("fk_manager_id")]
        public Guid? ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public virtual Employees? Manager { get; set; }

        public string? BankName { get; set; }
        public string? BankAccNo { get; set; }
        public string? BankIFSC { get; set; }
        public string? BankBranch { get; set; }
        
        public string? Department { get; set; }
        public string? Position { get; set; }

        public List<RefreshToken> RefreshTokens { get; set; }
        //public ICollection<Post> Posts { get; set; }
        //public ICollection<TravelExpense> TravelExpenses { get; set; }
        //public ICollection<EmployeeTravelDocument> EmployeeTravelDocuments { get; set; }
    }
}
