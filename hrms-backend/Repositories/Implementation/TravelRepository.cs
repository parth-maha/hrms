using hrms_backend.Data;
using hrms_backend.Models.DTO.Travel;
using hrms_backend.Models.Entities.Travel;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class TravelRepository : ITravelRepository
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

        public async Task RemoveAllocationsAsync(List<TravelAllocation> allocations)
        {
            _dbContext.TravelAllocation.RemoveRange(allocations);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<TravelAllocation?> GetAllocationAsync(Guid travelId, Guid empId)
        {
            return await _dbContext.TravelAllocation
                .Include(a => a.TravelPlan)
                .FirstOrDefaultAsync(a => a.TravelId == travelId && a.EmployeeId == empId);
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
                .Include(t=> t.CreatedBy)
                .OrderByDescending(t => t.StartDate)
                .ToListAsync();
        }

        public async Task<List<TravelPlan>> GetPlansByEmployeeIdAsync(Guid empId)
        {
            return await _dbContext.TravelPlans
                .Include(t => t.CreatedBy)
                .Include(t => t.TravelAllocation.Where(a=>a.EmployeeId==empId)).ThenInclude(a=>a.Employee)
                .Include(t => t.HrTravelDocuments)
                .OrderByDescending(t => t.StartDate)
                .ToListAsync();
        }

        public async Task AddHrDocumentAsync(HrTravelDocuments doc)
        {
            await _dbContext.HrTravelDocuments.AddAsync(doc);
            await _dbContext.SaveChangesAsync();
        }
        public async Task RemoveHrDocumentsAsync(List<HrTravelDocuments> hrTravelDocuments)
        {
            _dbContext.HrTravelDocuments.RemoveRange(hrTravelDocuments);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePlanAsync(TravelPlan plan)
        {
            _dbContext.TravelPlans.Update(plan);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteTravelPlan(TravelPlan plan)
        {
            _dbContext.TravelPlans.Update(plan);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddExpenseAsync(TravelExpense expense)
        {
            await _dbContext.TravelExpenses.AddAsync(expense);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<TravelExpense?> GetExpenseByIdAsync(Guid id)
        {
            return await _dbContext.TravelExpenses
            .Include(e => e.TravelAllocation).ThenInclude(a => a.Employee)
            .Include(e => e.EmployeeTravelDocuments)
            .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task UpdateExpenseAsync(TravelExpense expense)
        {
            _dbContext.TravelExpenses.Update(expense);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<TravelExpense>> GetAllTravelExpensesAsync()
        {
            return await _dbContext.TravelExpenses
                .Include(e => e.TravelAllocation).ThenInclude(e => e.TravelPlan)
                .Include(e => e.TravelAllocation).ThenInclude(a => a.Employee)
                .Include(e => e.EmployeeTravelDocuments)
                .OrderByDescending(e => e.ExpenseDate)
                .ToListAsync();
        }

        public async Task<List<TravelExpense>> GetExpenseByEmployeeAsync(Guid empId)
        {
            return await _dbContext.TravelExpenses
                .Include(e => e.TravelAllocation).ThenInclude(e => e.TravelPlan)
                .Include(e => e.EmployeeTravelDocuments)
                .Where(e => e.TravelAllocation.EmployeeId == empId)
                .OrderByDescending(e => e.ExpenseDate)
                .ToListAsync();
        }
        public async Task AddEmployeeDocumentAsync(EmployeeTravelDocument doc)
        {
            await _dbContext.EmployeeTravelDocuments.AddAsync(doc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeDocumentAsync(EmployeeTravelDocument doc)
        {
            _dbContext.EmployeeTravelDocuments.Remove(doc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<TravelExpense>> GetFilteredExpensesAsync(ExpenseFilterDto dto)
        {
            var query = _dbContext.TravelExpenses
                .Include(e => e.TravelAllocation).ThenInclude(a => a.TravelPlan)
                .Include(e => e.TravelAllocation).ThenInclude(a => a.Employee)
                .Include(e => e.EmployeeTravelDocuments)
                .AsQueryable();

            if(dto.employeeId.HasValue)
                query.Where(e => e.TravelAllocation.EmployeeId == dto.employeeId);
            

            if (dto.travelId.HasValue)
                query = query.Where(e => e.TravelAllocation.TravelId == dto.travelId);

            if (!string.IsNullOrEmpty(dto.category))
                query = query.Where(e => e.Category == dto.category);

            if (!string.IsNullOrEmpty(dto.status))
                query = query.Where(e => e.Status == dto.status);

            return await query.OrderByDescending(e => e.ExpenseDate).ToListAsync();
        }
    }
}
