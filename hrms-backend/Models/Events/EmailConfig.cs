namespace hrms_backend.Models.Events
{
    public class EmailConfig
    {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Host { get; set; }
            public int Port { get; set; }
            public bool EnableSSL { get; set; }
        
    }
}
