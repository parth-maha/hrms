//using hrms_backend.Models.Events;
//using MassTransit;

//namespace hrms_backend.Services.Consumers
//{
//    public class EmailConsumer : IConsumer
//    {
//        private readonly EmailService _emailService;
//        private readonly ILogger<EmailConsumer> _logger;

//        public EmailConsumer(EmailService emailService, ILogger<EmailConsumer> logger)
//        {
//            _emailService = emailService;
//            _logger = logger;
//        }

//        public async Task Consume(ConsumeContext<MailEvent> context)
//        {
//            var emailEvent = context.Message;

//            try
//            {
//                _logger.LogInformation($"Processing Email: {emailEvent.ToEmail}");
//                await _emailService.SendEmailAsync(
//                    emailEvent.ToEmail,
//                    emailEvent.Subject,
//                    emailEvent.Body
//                );
//                _logger.LogInformation($"Mail Sent: {emailEvent.ToEmail}");
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError($"Error processing email to {emailEvent.ToEmail}: {ex.Message}");
//                throw;
//            }
//        }
//    }
//}
