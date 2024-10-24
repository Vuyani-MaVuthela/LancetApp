using MedAPI.Application.Services;
using MedAPI.Core.Interfaces;
using MedAPI.Infrastructure.Configurations;
using MedAPI.Infrastructure.Repositories;

namespace MedAPI.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureServices(this IServiceCollection services, WebApplicationBuilder builder)
    {
        // Register custom services
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IAvatarService, AvatarService>();

        services.Configure<PatientRepositoryOptions>(builder.Configuration.GetSection("PatientRepositoryOptions"));
        services.AddScoped<IPatientRepository, FilePatientRepository>();
    }
}