namespace hrms_backend.Models.DTO.Travel
{
    public class EmployeeExpenseDto
    {
        public Guid Id { get; set;  }  //travel id 
        public string description { get; set; }
        public long totalAmount { get; set; }
        public List<ExpenseDto> expenses { get; set; }
    }
}
