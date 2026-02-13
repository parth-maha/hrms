namespace hrms_backend.Models.DTO.Travel
{
    public class ExpenseDto
    {
        public string category { get; set; }
        public DateOnly expenseDate { get; set; }
        public long expenseAmount { get; set; }

        public IFormFile document { get; set; }
    }
}
