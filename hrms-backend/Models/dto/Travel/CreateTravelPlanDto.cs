namespace hrms_backend.Models.DTO.Travel
{
    public class CreateTravelPlanDto
    {
        public string name { get; set; }
        public string description { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public List<Guid> employeeIds { get; set; }
        public List<IFormFile> documents { get; set; }
        //public List<HrTravelDocumentDto> documents { get; set; }
    }
}
