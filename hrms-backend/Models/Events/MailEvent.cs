namespace hrms_backend.Models.Events
{
    public class MailEvent
    {
            public Guid Id { get; set; }
            public string ToEmail { get; set; }
            public string Subject { get; set; }
            public string Body { get; set; }
            public DateTime CreatedAt { get; set; }
        
    }
}
