namespace hrms_backend.Models.dto.Jobs
{
    public class ShareJobDTO
    {
        public Guid JobId { get; set; }
        public Guid SharedById{ get; set; }

        public string ShareToEmail { get; set; }
    }
}
