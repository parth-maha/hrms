namespace hrms_backend.Models.DTO.Travel
{
    public class HrTravelDocumentDto
    {
        public string uploadedBy { get; set; }
        public string ownerType { get; set;  }
        public string fileName { get; set;  }
        public IFormFile file { get; set; }
    }
}
