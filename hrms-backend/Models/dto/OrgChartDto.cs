namespace hrms_backend.Models.DTO
{
    public class OrgChartDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public List<OrgChartDto> DirectReports { get; set; } = new List<OrgChartDto>();
    }
}
