using hrms_backend.Models.Constants;

namespace hrms_backend.Models.dto
{
    public class EmailDto
    {
        public string ToEmail { get; set; }

        public string Body { get; set; }

        public string Subject { get; set; }

        public EmailType Type { get; set; }

    }
}
