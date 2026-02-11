using hrms_backend.Models.Constants;
using hrms_backend.Models.dto;
using hrms_backend.Models.Events;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace hrms_backend.Services
{
    public class EmailService
    {
        private readonly EmailConfig _emailConfig;
        private readonly ILogger<EmailService> _logger;
        private readonly IWebHostEnvironment _env;

        public EmailService(IOptions<EmailConfig> config, ILogger<EmailService> logger, IWebHostEnvironment env )
        {
            _emailConfig = config.Value;
            _logger = logger;
            _env = env;
        }
        public async Task SendEmailAsync(EmailDto dto)
        {
            if(dto.Type == EmailType.REFERRAL)
            {
                var email = JobReferralEmail(dto);
                SendEmailMessage(email);
            }else if(dto.Type == EmailType.SHARE_JOB)
            {
                var email = JobShareEmail(dto); 
                SendEmailMessage(email);
            }

            _logger.LogInformation($"Mail Sent: {dto.ToEmail} for {dto.Type}");
        }

        private MimeMessage JobReferralEmail(EmailDto req)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_emailConfig.Username));
            email.To.Add(MailboxAddress.Parse(req.ToEmail));
            email.Subject = req.Subject;

            email.Body = new TextPart(TextFormat.Html)
            {
                Text = $"<p>{req.Body}</p>"
            };

            return email;
        }

        private MimeMessage JobShareEmail(EmailDto req)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_emailConfig.Username));
            email.To.Add(MailboxAddress.Parse(req.ToEmail));
            email.Subject = req.Subject;

            email.Body = new TextPart(TextFormat.Html)
            {
                Text = $"<p>{req.Body}</p>"
            };

            return email;
        }

        private void SendEmailMessage(MimeMessage email)
        {
            using var smtp = new SmtpClient();

            var host = _emailConfig.Host;
            var port = _emailConfig.Port;
            var username = _emailConfig.Username;
            var password = _emailConfig.Password;

            if (string.IsNullOrWhiteSpace(host))
                throw new InvalidOperationException("EmailHost configuration is missing");
            if (port <= 0)
                throw new InvalidOperationException("Invalid Port configuration");
            if (string.IsNullOrWhiteSpace(username))
                throw new InvalidOperationException("EmailUsername configuration is missing");
            if (string.IsNullOrWhiteSpace(password))
                throw new InvalidOperationException("EmailPassword configuration is missing");

            smtp.Connect(host, port, SecureSocketOptions.StartTls);
            smtp.Authenticate(username, password);

            try
            {
                smtp.Send(email);
            }
            finally
            {
                smtp.Disconnect(true);
            }
        }
    }
}
