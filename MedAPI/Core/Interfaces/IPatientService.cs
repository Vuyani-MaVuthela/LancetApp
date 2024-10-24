using MedAPI.Application.DTOs;
using MedAPI.Core.Common;
using MedAPI.Core.Entities;

namespace MedAPI.Core.Interfaces;

public interface IPatientService
{
    Task<IEnumerable<PatientDto>> GetAllPatients();
    Task<Result<PatientProfile>> GetPatientById(Guid id);
    Task<Result> SavePatient(PatientProfile patientProfile);
    Task<Result> UpdatePatient(PatientProfile patientProfile);
}