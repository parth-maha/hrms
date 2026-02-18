using hrms_backend.Models.Constants;
using hrms_backend.Models.dto;
using hrms_backend.Models.Events;
using hrms_backend.Repositories;
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
        private static readonly HttpClient httpClient = new HttpClient();
        private readonly ISystemRepository _systemRepo;

        public EmailService(IOptions<EmailConfig> config, ILogger<EmailService> logger, ISystemRepository systemRepository)
        {
            _emailConfig = config.Value;
            _logger = logger;
            _systemRepo = systemRepository;
        }
        public async Task SendEmailAsync(EmailDto dto)
        {
            if(dto.Type == EmailType.REFERRAL)
            {
                await JobReferralEmail(dto);
            }else if(dto.Type == EmailType.SHARE_JOB)
            {
                await JobShareEmail(dto); 
            }

            _logger.LogInformation($"Mail Sent: {dto.ToEmail} for {dto.Type}");
        }

        private async Task JobReferralEmail(EmailDto req)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_emailConfig.Username));
            email.To.Add(MailboxAddress.Parse(req.ToEmail));
            email.Subject = req.Subject;
            
            var defaultMail = await _systemRepo.GetDefaultMail();
            var deafaultHr = await _systemRepo.GetHrEmail();

            if (deafaultHr==null || string.IsNullOrEmpty(deafaultHr.ConfigValue)) throw new Exception("Default hr is null");
            if (deafaultHr == null || string.IsNullOrEmpty(deafaultHr.ConfigValue)) throw new Exception("Default hr is null");
            
            email.Cc.Add(new MailboxAddress("HR",defaultMail.ConfigValue));
            email.Cc.Add(new MailboxAddress("Default Email", defaultMail.ConfigValue));

            if (req.cc!=null && req.cc.Any())
            {
                foreach (var c in req.cc)
                {
                    email.Cc.Add(new MailboxAddress("CC",c));
                }
            }

            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <p>{req.Body.Replace("\n", "<br/>")}</p>   
                </hr>
                <p> Please find the attached candidate CV </p>
            ";

            email.Body = builder.ToMessageBody();
            await SendEmailMessage(email);
        }

        private async Task JobShareEmail(EmailDto req)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_emailConfig.Username));
            email.To.Add(MailboxAddress.Parse(req.ToEmail));
            email.Subject = req.Subject;

            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <p>{req.Body.Replace("\n", "<br/>")}</p>   
                </hr>
                <p> Check out job details in deattached file </p>
            ";

            email.Body = builder.ToMessageBody();
            await SendEmailMessage(email);
        }

        private async Task SendEmailMessage(MimeMessage email)
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
