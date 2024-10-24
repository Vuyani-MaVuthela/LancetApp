using MedAPI.Core.Interfaces;
using MedAPI.Infrastructure.Configurations;
using MedAPI.Infrastructure.Repositories;

namespace MedAPI.Infrastructure.Persistence;

public static class PersistenceConfig
{
    public static void AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<PatientRepositoryOptions>(configuration.GetSection("PatientRepositoryOptions"));
        services.AddScoped<IPatientRepository, FilePatientRepository>();

        // can register other services related to persistence here as well like logging
    }
}