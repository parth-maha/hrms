using hrms_backend.Services;
using hrms_backend.Services.Consumers;
using hrms_backend.Services.RabbitMq;
using MassTransit;
using Microsoft.OpenApi.Models;
using NLog.Extensions.Logging;
using RabbitMQ.Client;

namespace hrms_backend
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services,IConfiguration configuration)
        {
            services.AddControllers();

            //========================== Configure NLog ===============
            services.AddLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(LogLevel.Trace);
            });
            services.AddSingleton<ILoggerProvider, NLogLoggerProvider>();
            //==========================================================

            // =========================== RABBIT MQ ==============================
            var rabbitMqConfig = configuration.GetSection("RabbitMq").Get<RabbitMqConfig>();
            services.AddSingleton<IConnectionFactory>(sp =>
            {
                return new ConnectionFactory
                {
                    HostName = rabbitMqConfig.Host,
                    Port = rabbitMqConfig.Port,
                    UserName = rabbitMqConfig.Username,
                    Password = rabbitMqConfig.Password,
                    VirtualHost = "/"
                };
            });

            services.AddMassTransit(x =>
            {
                // Register the email consumer
                x.AddConsumer<EmailConsumer>();

                // Configure RabbitMQ transport
                x.UsingRabbitMq((context, cfg) =>
                {
                    // Use URI-based host configuration with port
                    cfg.Host($"rabbitmq://{rabbitMqConfig.Host}:{rabbitMqConfig.Port}", h =>
                    {
                        h.Username(rabbitMqConfig.Username);
                        h.Password(rabbitMqConfig.Password);
                    });

                    // Configure endpoint for consuming emails
                    cfg.ReceiveEndpoint("email-queue", e =>
                    {
                        e.ConfigureConsumer<EmailConsumer>(context);

                        // Retry policy: retry 3 times with incremental method
                        e.UseMessageRetry(r =>
                        {
                            r.Incremental(3, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(8));
                        });

                        // Concurrency limit
                        e.ConcurrentMessageLimit = 10;
                    });
                });
            });

            //============================ APP SERVICES ====================

            services.AddScoped<EmployeeService>();
            services.AddScoped<AuthService>();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen((c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "HRMS API", Version = "v1" });
            }));

        }
    }
}
