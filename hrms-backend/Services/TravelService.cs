using hrms_backend.Models.DTO.Travel;
using hrms_backend.Models.Entities.Travel;
using hrms_backend.Repositories;
using hrms_backend.Services.CloudinaryService;

namespace hrms_backend.Services
{
    public class TravelService
    {
        private readonly CloudinaryServiceImpl _cloudinaryService;
        private readonly ITravelRepo _travelRepo;
        private EmailService _emailService;
        private ILogger<TravelService> _logger;

        public TravelService(CloudinaryServiceImpl cloudinaryService, ITravelRepo travelRepo, EmailService emailService, ILogger<TravelService> logger)
        {
            _cloudinaryService = cloudinaryService;
            _travelRepo = travelRepo;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task CreatePlan(CreateTravelPlanDto dto, Guid hrId)
        {

            var plan = new TravelPlan
            {
                Id = Guid.NewGuid(),
                Name = dto.name,
                Description = dto.description,
                StartDate = dto.startDate,
                EndDate = dto.endDate,
                CreatedById = hrId
            };

            await _travelRepo.AddPlanAsync(plan);

            if (dto.employeeIds != null && dto.employeeIds.Any())
            {
                var allocations = dto.employeeIds.Select(empId => new TravelAllocation
                {
                    Id = Guid.NewGuid(),
                    TravelId = plan.Id,
                    EmployeeId = empId
                }).ToList();

                await _travelRepo.AddAllocationAsync(allocations);

                //foreach (var empId in dto.EmployeeIds)
                //{
                //    var emp = await _empRepo.GetById(empId);
                //    //await _emailService.SendEmailAsync(...);
                //}
            }

            if (dto.documents != null && dto.documents.Any())
            {
                foreach (var file in dto.documents)
                {
                    var result = await _cloudinaryService.UploadDocument(file);

                    var document = new HrTravelDocuments
                    {
                        FileName = file.FileName,
                        Url = result.Url,
                        TravelPlan = plan,
                        TravelId = plan.Id,
                        OwnerType = "HR",
                        UploadedById = hrId,
                        UploadedAt = DateTime.UtcNow,
                    };

                    await _travelRepo.AddHrDocumentAsync(document);
                }
            }

            _logger.LogInformation($"Travel Plan Created. Name:{plan.Name} CreatedBy:{plan.CreatedBy.FirstName} {plan.CreatedBy.LastName}");
        }

        public async Task UpdatePlan(Guid id, CreateTravelPlanDto dto, Guid hrId)
        {
            var plan = await _travelRepo.GetPlanByIdAsync(id);
            if (plan == null)
            {
                throw new Exception("Travel plan not found");
            }

            plan.Name = dto.name;
            plan.Description = dto.description;
            plan.StartDate = dto.startDate;
            plan.EndDate = dto.endDate;

            if(dto.employeeIds!= null && dto.employeeIds.Any())
            {
                await _travelRepo.RemoveAllocationsAsync(plan.TravelAllocation.ToList());
                
                var newAllocations = dto.employeeIds.Select(empId => new TravelAllocation
                {
                   Id = Guid.NewGuid(),
                   TravelId = plan.Id,
                   EmployeeId = empId
                 }).ToList();
                 await _travelRepo.AddAllocationAsync(newAllocations);
            }

            if(dto.documents!=null && dto.documents.Any())
            {
                foreach(var file in dto.documents)
                {
                    if(plan.HrTravelDocuments.Any())
                    {
                        foreach(var doc in  plan.HrTravelDocuments)
                        {
                            await _cloudinaryService.DeleteFileAsync(doc.Url);
                        }
                        await _travelRepo.RemoveHrDocumentsAsync(plan.HrTravelDocuments.ToList());
                    }

                    var result = await _cloudinaryService.UploadDocument(file);

                    var document = new HrTravelDocuments
                    {
                        FileName = file.FileName,
                        Url = result.Url,
                        TravelPlan = plan,
                        TravelId = plan.Id,
                        OwnerType = "HR",
                        UploadedById = hrId,
                        UploadedAt = DateTime.Now,
                    };

                    await _travelRepo.AddHrDocumentAsync(document);
                }
            }

            await _travelRepo.UpdatePlanAsync(plan);

            _logger.LogInformation($"Travel Plan Updated. Name:{plan.Name} UpdatedBy:{hrId}");
        }

        public async Task DeleteTravelPlan(Guid id,Guid hrId)
        {
            var plan = await _travelRepo.GetPlanByIdAsync(id);
            if (plan == null) throw new Exception("Plan not found");

            plan.IsDeleted = true;
            plan.DeletedOn = DateTime.UtcNow;
            foreach(var allocation in plan.TravelAllocation)
            {
                allocation.IsDeleted = true;
                allocation.DeletedOn = DateTime.UtcNow;
            }

            foreach(var document in plan.HrTravelDocuments)
            {
                document.IsDeleted = true;
                document.DeletedOn = DateTime.UtcNow;
            }
            await _travelRepo.DeleteTravelPlan(plan);
            _logger.LogInformation($"Travel Plan Deleted. Name:{plan.Name} DeletedBy:{hrId}");
        }
        public async Task<List<TravelPlanDto>> GetMyPlans(Guid empId)
        {
            var plans = await _travelRepo.GetPlansByEmployeeIdAsync(empId);
            return plans.Select(mapToTravelDto).ToList();
        }
        public async Task<List<TravelPlan>> GetAllPlans()
        {
            var plans = await _travelRepo.GetAllPlansAsync();
            return plans;
        }

        public async Task AddExpense(AddExpenseDto dto, Guid empId)
        {
            var allocation = await _travelRepo.GetAllocationAsync(dto.travelId,empId);
            if (allocation == null) throw new Exception("You dont have this travel plan");

            var plan = allocation.TravelPlan;

            //check dates
            if(DateTime.UtcNow.Date < plan.StartDate.Date)
            {
                throw new Exception("Cannot submit expense before travel");
            }

            if(DateTime.UtcNow.Date >  plan.EndDate.AddDays(10))
            {
                throw new Exception("Submissiobn window closes");
            }

            if(dto.proof == null)
            {
                throw new Exception("Expense proof is required");
            }

            // create expense
            var expense = new TravelExpense
            {
                Id= Guid.NewGuid(),
                AllocationId= allocation.Id,
                Description = dto.description,
                TotalAmount = dto.amount,
                Status = "PENDING",
                Category = dto.category,
                ExpenseDate = dto.expenseDate
            };

            await _travelRepo.AddExpenseAsync(expense);

            var result = await _cloudinaryService.UploadDocument(dto.proof);

            var doc = new EmployeeTravelDocument
            {
                ExpenseType = dto.expenseType,
                FileName = dto.proof.FileName,
                UploadedAt = DateTime.UtcNow,
                OwnerType = "EMPLOYEE",
                Url = result.Url,
                TravelExpense = expense,
                TravelExpenseId = expense.Id
            };

            await _travelRepo.AddEmployeeDocumentAsync(doc);

            _logger.LogInformation($"Expense Added. ExpenseId:{expense.Id} FileName:{doc.FileName} By:{expense.TravelAllocation.EmployeeId}");
        }

        public async Task<List<ExpenseResponseDto>> GetMyExpenses(Guid empId)
        {
            var expenses = await _travelRepo.GetExpenseByEmployeeAsync(empId);
            return expenses.Select(e => new ExpenseResponseDto
            {
                Id = e.Id,
                travelName = e.TravelAllocation.TravelPlan.Name,
                description = e.Description,
                amount = e.TotalAmount,
                category = e.Category,
                expenseDate = e.ExpenseDate,
                status = e.Status,
                hrRemarks = e.HrRemarks,
                document = e.EmployeeTravelDocuments.Url,
                fileName = e.EmployeeTravelDocuments.FileName
            }).ToList();
        }

        public async Task<List<ExpenseResponseDto>> GetAllExpenses()
        {
            var expenses = await _travelRepo.GetAllTravelExpensesAsync();
            return expenses.Select(e => new ExpenseResponseDto
            {
                Id = e.Id,
                travelName = e.TravelAllocation.TravelPlan.Name,
                description = e.Description,
                amount = e.TotalAmount,
                category = e.Category,
                expenseDate = e.ExpenseDate,
                status = e.Status,
                employeeName = $"{e.TravelAllocation.Employee.FirstName} {e.TravelAllocation.Employee.LastName}",
                hrRemarks = e.HrRemarks,
                document = e.EmployeeTravelDocuments.Url,
                fileName = e.EmployeeTravelDocuments.FileName
            }).ToList();
        }

        public async Task UpdateExpenseStatus(Guid expenseId, UpdateExpenseStatusDto dto, Guid hrId)
        {
            var expense = await _travelRepo.GetExpenseByIdAsync(expenseId);
            if (expense == null) throw new Exception("Expense not found");

            expense.Status = dto.status;
            expense.ApprovedById = hrId;
            if (dto.remarks != null)
            {
                expense.HrRemarks = dto.remarks;
            }

            await _travelRepo.UpdateExpenseAsync(expense);

            _logger.LogInformation($"Expense Status Updated. ExpenseId:{expense.Id} Status:{expense.Status}");
        }

        public async Task UpdateExpense(Guid expenseId, AddExpenseDto dto,Guid empId)
        {
            var expense = await _travelRepo.GetExpenseByIdAsync(expenseId);

            if (expense == null) throw new Exception("Expense not found");
            if (expense.Status != "PENDING") throw new Exception("Only pending expenses can be edited");

            expense.Description = dto.description;
            expense.TotalAmount = dto.amount;
            expense.Category = dto.category;
            expense.ExpenseDate = dto.expenseDate;

            if (dto.proof != null)
            {
                if (expense.EmployeeTravelDocuments != null)
                {
                    await _cloudinaryService.DeleteFileAsync(expense.EmployeeTravelDocuments.Url);
                    await _travelRepo.DeleteEmployeeDocumentAsync(expense.EmployeeTravelDocuments);
                }

                var result = await _cloudinaryService.UploadDocument(dto.proof);
                var newDoc = new EmployeeTravelDocument
                {
                    Id = Guid.NewGuid(),
                    FileName = dto.proof.FileName,
                    Url = result.Url,
                    UploadedAt = DateTime.UtcNow,
                    ExpenseType = dto.expenseType,
                    TravelExpenseId = expense.Id,
                    OwnerType = "EMPLOYEE"
                };
                await _travelRepo.AddEmployeeDocumentAsync(newDoc);
            }

            await _travelRepo.UpdateExpenseAsync(expense);

            _logger.LogInformation($"Expense Updated. ExpenseId:{expense.Id} UpdatedBy:{empId}");
        }


        // ======================= HELPERS =====================
        private TravelPlanDto mapToTravelDto(TravelPlan plan)
        {
            return new TravelPlanDto
            {
                id = plan.Id.ToString(),
                name = plan.Name,
                description = plan.Description,
                startDate = plan.StartDate,
                endDate = plan.EndDate,
                createdBy = $"{plan.CreatedBy.FirstName} {plan.CreatedBy.LastName}",
                   documents = plan.HrTravelDocuments.Select(dto => new DocumentsDto
                   {
                       id = dto.Id.ToString(),
                       fileName = dto.FileName,
                       url = dto.Url,
                   }).ToList(),
                employeeIds = plan.TravelAllocation.Select(dto => new EmployeeListDto
                {
                    id = dto.Employee.Id.ToString(),
                    name = $"{dto.Employee.FirstName} {dto.Employee.LastName}"
                }).ToList()
            };
        }
    }
}
