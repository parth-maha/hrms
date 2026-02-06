using hrms_backend.Models.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities
{
    public class Employees
    {
        [Key]
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
        public string Phone { get; set; }

        public Gender Gender { get; set; }

        public string PanNo { get; set; }


        public string AadharNo { get; set; }

        public BloodGroup BloodGroup { get; set; }

        [ForeignKey("manager_id")]
        public Guid? ManagerId;

        public string BankName { get; set; }
        public string BankAccNo { get; set; }
        public string BankIFSC { get; set; }
        public string BankBranch { get; set; }
        
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }

        public List<RefreshToken> RefreshTokens { get; set; }
    }
}
