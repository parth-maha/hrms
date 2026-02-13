using hrms_backend.Models.dto.Jobs;
using hrms_backend.Models.DTO.Travel;
using hrms_backend.Models.Entities.Jobs;
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

            if(dto.files!=null  && dto.files.Any())
            {
                foreach(var file in dto.files)
                {
                    var result = await _cloudinaryService.UploadDocument(file);

                    var document = new HrTravelDocuments
                    {
                        FileName = file.FileName,
                        Url = result.Url,
                        TravelPlan = plan,
                        OwnerType = "HR",
                        UploadedById = hrId,
                        UploadedAt = DateTime.Now,
                    };

                    await _travelRepo.AddHrDocumentAsync(document);
                }
            }
        }

        public async Task<List<TravelPlanDto>> GetMyPlans(Guid empId)
        {
            var plans = await _travelRepo.GetPlansByEmployeeIdAsync(empId);
            return plans.Select(mapToTravelDto).ToList();
        }
        public async Task<List<TravelPlanDto>> GetAllPlans()
        {
            var plans = await _travelRepo.GetAllPlansAsync();
            return plans.Select(mapToTravelDto).ToList();
        }


        private TravelPlanDto mapToTravelDto(TravelPlan plan)
        {
            return new TravelPlanDto
            {
                   id = plan.Id.ToString(),
                   name=plan.Name,
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
            };
        }
    }
}
