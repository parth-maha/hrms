namespace hrms_backend.Models.dto.Jobs
{
    public class CreateJobDTO
    {
        public string Title { get; set; }
        public string JobCode { get; set; }
        public string Description { get; set; }
        public Guid PocId { get; set; } 
        public bool IsOpen { get; set; }
        public string? AttachedFile { get; set; }
        public List<Guid> ReviewerIds { get; set; } = new List<Guid>();
    }
}
