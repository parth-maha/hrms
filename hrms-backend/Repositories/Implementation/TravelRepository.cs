using hrms_backend.Data;
using hrms_backend.Models.Entities.Travel;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class TravelRepository : ITravelRepo
    {
        public ApplicationDbContext _dbContext;

        public TravelRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext; 
        }

        public async Task AddPlanAsync(TravelPlan plan)
        {
            await _dbContext.TravelPlans.AddAsync(plan);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddAllocationAsync(List<TravelAllocation> allocations)
        {
            await _dbContext.TravelAllocation.AddRangeAsync(allocations);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<TravelPlan?> GetPlanByIdAsync(Guid id)
        {
            return await _dbContext.TravelPlans
                .Include(t => t.TravelAllocation).ThenInclude(a => a.Employee)
                .Include(t => t.HrTravelDocuments)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<TravelPlan>> GetAllPlansAsync()
        {
            return await _dbContext.TravelPlans
                .Include(t => t.TravelAllocation).ThenInclude(a => a.Employee)
                .Include(t => t.HrTravelDocuments)
                .OrderByDescending(t => t.StartDate)
                .ToListAsync();
        }

        public async Task<List<TravelPlan>> GetPlansByEmployeeIdAsync(Guid empId)
        {
            return await _dbContext.TravelPlans
                .Where(t => t.TravelAllocation.Any(a => a.EmployeeId == empId))
                .Include(t => t.TravelAllocation.Where(a => a.EmployeeId == empId))
                .Include(t => t.HrTravelDocuments)
                .OrderByDescending(t => t.StartDate)
                .ToListAsync();
        }

        public async Task<TravelAllocation?> GetAllocationAsync(Guid travelId, Guid empId)
        {
            return await _dbContext.TravelAllocation
                .Include(a => a.TravelPlan)
                .FirstOrDefaultAsync(a => a.TravelId == travelId && a.EmployeeId == empId);
        }

        public async Task AddHrDocumentAsync(HrTravelDocuments doc)
        {
            await _dbContext.HrTravelDocuments.AddAsync(doc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteTravelPlan(TravelPlan plan)
        {
            _dbContext.TravelPlans.Update(plan);
            await _dbContext.SaveChangesAsync();
        }

        //public async Task AddExpenseAsync(TravelExpense expense)
        //{
        //    await _dbContext.TravelExpenses.AddAsync(expense);
        //    await _dbContext.SaveChangesAsync();
        //}

        //public async Task<TravelExpense?> GetExpenseByIdAsync(Guid id)
        //{
        //    return await _dbContext.TravelExpenses.Include(e => e.TravelAllocation).ThenInclude(a => a.Employee).FirstOrDefaultAsync(e => e.Id == id);
        //}

        //public async Task UpdateExpenseAsync(TravelExpense expense)
        //{
        //    _dbContext.TravelExpenses.Update(expense);
        //    await _dbContext.SaveChangesAsync();
        //}

        //public async Task AddEmployeeDocumentAsync(EmployeeTravelDocument doc)
        //{
        //    await _dbContext.EmployeeTravelDocuments.AddAsync(doc);
        //    await _dbContext.SaveChangesAsync();
        //}
    }
}
