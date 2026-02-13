using hrms_backend.Models.Entities.Travel;

namespace hrms_backend.Repositories
{
    public interface ITravelRepo
    {
        Task AddPlanAsync(TravelPlan plan);
        Task AddAllocationAsync(List<TravelAllocation> allocations);
        Task<TravelPlan?> GetPlanByIdAsync(Guid id);
        Task<List<TravelPlan>> GetPlansByEmployeeIdAsync(Guid empId);
        Task<List<TravelPlan>> GetAllPlansAsync();
        Task AddHrDocumentAsync(HrTravelDocuments doc);

        Task<TravelAllocation?> GetAllocationAsync(Guid travelId, Guid empId);
        //Task AddExpenseAsync(TravelExpense expense);
        //Task<TravelExpense?> GetExpenseByIdAsync(Guid id);
        //Task UpdateExpenseAsync(TravelExpense expense);

        //Task AddEmployeeDocumentAsync(EmployeeTravelDocument doc);
    }
}
