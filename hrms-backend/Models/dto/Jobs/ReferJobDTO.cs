namespace hrms_backend.Models.dto.Jobs
{
    public class ReferJobDTO
    {
        public Guid JobId { get; set; }

        public Guid ReferredBy { get; set; }
        public string ToName { get; set; }
        public string ToEmail { get; set; }
        public string ToCvUrl { get; set; }
    }
}
