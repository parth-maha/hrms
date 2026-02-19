using hrms_backend.Data;
using hrms_backend.Helpers;
using hrms_backend.Models.Events;
using hrms_backend.Repositories;
using hrms_backend.Repositories.Implementation;
using hrms_backend.Services;
using hrms_backend.Services.Authorization;
using hrms_backend.Services.CloudinaryService;
using hrms_backend.Services.Games;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NLog.Extensions.Logging;

namespace hrms_backend
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.Configure<EmailConfig>(Configuration.GetSection("Smtp"));
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.Configure<CloudinaryConfig>(Configuration.GetSection("Cloudinary"));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
            });

            services.AddControllers();

            services.AddLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(LogLevel.Trace);
            });
            services.AddSingleton<ILoggerProvider, NLogLoggerProvider>();

            services.AddScoped<CloudinaryServiceImpl>();
            services.AddScoped<JwtUtils>();
            services.AddScoped<AuthService>();
            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<JobService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<EmployeeService>();
            services.AddScoped<ISystemRepository,SystemRepository>();
            services.AddScoped<SystemService>();
            services.AddScoped<ITravelRepository, TravelRepository>();
            services.AddScoped<TravelService>();
            services.AddScoped<IGameTypeRepository, GameTypeRepository>();
            services.AddScoped<IGameSlotRepository,GameSlotRepository>();
            services.AddScoped<GameTypeService>();

            services.AddScoped<EmailService>();
            services.AddHttpClient();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "HRMS API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });
        }
    }
}
