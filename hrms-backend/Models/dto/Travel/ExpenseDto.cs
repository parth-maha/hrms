namespace hrms_backend.Models.DTO.Travel
{
    public class AddExpenseDto
    {
        public Guid travelId { get; set; }
        public string? description { get; set; }
        public string category { get; set; }
        public DateTime expenseDate { get; set; }
        public long amount { get; set; }
        public string? expenseType { get; set; }
        public IFormFile? proof { get; set; }
    }


    public class ExpenseResponseDto
    {
        public Guid Id { get; set; }
        public string travelName { get; set; }
        public string description { get; set; }

        public string employeeName { get; set; }
        public long amount { get; set; }
        public string category { get; set; }
        public DateTime expenseDate { get; set; }
        public string status { get; set; }
        public string hrRemarks { get; set; }
        public string document { get; set; }

        public string fileName { get; set; }
    }
    public class UpdateExpenseStatusDto
    {
        public string status { get; set; }
        public string? remarks { get; set;  }
    }

    public class ExpenseFilterDto
    {
        public Guid? employeeId { get; set; }
        public Guid? travelId { get; set; }

        public string? status { get; set; }
        public DateTime? fromDate { get; set; }
        public DateTime? toDate { get; set; }
    }
}
