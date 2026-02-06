namespace hrms_backend.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        
        // IN DAYS
        public int RefreshTokenTTL { get; set; }
    }
}
