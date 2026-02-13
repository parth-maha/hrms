using MassTransit;

namespace hrms_backend.Models.DTO.Travel
{
    public class TravelPlanDto
    {
        public string id { get; set; }
        public string name { get; set; }
        public string description { get; set; }

        public DateTime startDate { get; set;  }
        public DateTime endDate { get; set; }

        public string createdBy { get; set; }

        public List<DocumentsDto> documents { get; set; }
    }

    public class DocumentsDto
    {
        public string id { get; set; }
        public string fileName { get; set;  }
        public string url { get; set; }
    }
}
