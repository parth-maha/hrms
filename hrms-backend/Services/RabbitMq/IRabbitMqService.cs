using hrms_backend.Models.Events;

namespace hrms_backend.Services.RabbitMq
{
    public interface IRabbitMqService
    {
        Task PublishEmailAsync(MailEvent emailEvent);
    }
}
