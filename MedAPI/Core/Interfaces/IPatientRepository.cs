using MedAPI.Core.Entities;

namespace MedAPI.Core.Interfaces;

public interface IPatientRepository
{
    Task<Patient> GetPatientByIdAsync(Guid id);
    Task AddPatientAsync(Patient patient);
}