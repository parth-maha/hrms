namespace hrms_backend.Models.dto.Jobs
{
    public class JobDto
    {
        public Guid JobId { get; set; }
        public string Title { get; set; }
        public string JobCode { get; set; }
        public string Description { get; set; }
        public Guid PocId { get; set; }
        public string PocName { get; set;  }
        public DateTime PostedAt { get; set; }
        public string? AttachedFile { get; set; }
        public List<ReviewerDto> Reviewers { get; set; }
    }
}
