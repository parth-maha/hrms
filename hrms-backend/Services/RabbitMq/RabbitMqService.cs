using hrms_backend.Models.Events;
using MassTransit;

namespace hrms_backend.Services.RabbitMq
{
    public class RabbitMqService: IRabbitMqService
    {
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly ILogger<RabbitMqService> _logger;

        public RabbitMqService(IPublishEndpoint publishEndpoint, ILogger<RabbitMqService> logger)
        {
            _publishEndpoint = publishEndpoint;
            _logger = logger;
        }

        public async Task PublishEmailAsync(MailEvent emailEvent)
        {
            try
            {
                emailEvent.Id = Guid.NewGuid();
                emailEvent.CreatedAt = DateTime.UtcNow;

                await _publishEndpoint.Publish(emailEvent);
                _logger.LogInformation($"Email sent to :{emailEvent.ToEmail}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to publish email event: {ex.Message}");
                throw;
            }
        }
    }
}
