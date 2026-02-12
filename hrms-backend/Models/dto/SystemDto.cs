namespace hrms_backend.Models.DTO
{
    public class SystemDto
    {
        public class ConfigDto
        {
            public int Id { get; set; }
            public string CreatedBy { get; set; }
            public string ConfigId { get; set;  }
            public string ConfigName { get; set;}
            public string ConfigValue { get; set; }
        }

        public class AddConfigDto
        {
            public string ConfigId { get; set; }
            public string ConfigName { get; set; }
            public string ConfigValue { get; set; }
        }
    }
}
