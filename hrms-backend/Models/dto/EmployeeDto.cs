using hrms_backend.Models.Entities;

namespace hrms_backend.Models.dto
{
    public class EmployeeDto
    {
        public Guid Id { get; set; }

        public string EmployeeId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Roles { get; set; }

        public DateTime Dob { get; set; }

        public DateTime JoiningDate { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public string? PanNo { get; set; }


        public string? AadharNo { get; set; }

        public string? BloodGroup { get; set; }

        public Guid? ManagerId { get; set; } 
        public string? MangerName { get; set; }

        public string? BankName { get; set; }
        public string? BankAccNo { get; set; }
        public string? BankIFSC { get; set; }
        public string? BankBranch { get; set; }

        public string? Department { get; set; }
        public string? Position { get; set; }
    }
}
