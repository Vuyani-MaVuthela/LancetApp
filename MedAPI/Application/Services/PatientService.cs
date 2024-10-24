using MedAPI.Application.DTOs;
using MedAPI.Core.Common;
using MedAPI.Core.Entities;
using MedAPI.Core.Interfaces;
using Newtonsoft.Json;

public class PatientService : IPatientService
{
    private readonly string _dataPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Patients");
    private readonly List<PatientProfile> _patients;

    public PatientService()
    {
        _patients = new List<PatientProfile>();
    }

    public async Task<IEnumerable<PatientDto>> GetAllPatients()
    {
        var patientProfiles = new List<PatientProfile>();

        try
        {
            var files = Directory.GetFiles(_dataPath, "*.json");

            foreach (var file in files)
            {
                var json = await File.ReadAllTextAsync(file);

                var patientProfile = JsonConvert.DeserializeObject<PatientProfile>(json);

                if (patientProfile != null)
                {
                    patientProfiles.Add(patientProfile);
                }
            }
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to load patients: {ex.Message}");
        }

        return patientProfiles.Select(p => new PatientDto
        {
            PatientId = p.Patient.PatientId,
            Name = p.Patient.PatientName,
            AvatarFilePath = p.AvatarFilePath,
            Requisitions = p.Requisitions.Select(r => new RequisitionDto
            {
                RequisitionId = r.RequisitionId,
                DateSubmitted = r.DateSubmitted,
                ReferringPhysician = r.ReferringPhysician,
                Tests = r.Tests.Select(t => new TestDto
                {
                    TestId = t.TestId,
                    TestName = t.TestName,
                    Comment = t.Comment,
                    NormalRange = t.NormalRange,
                    TestResult = t.TestResult
                }).ToList()
            }).ToList()
        }).ToList();
    }


    public async Task<Result<PatientProfile>> GetPatientById(Guid id)
    {
        var filePath = Path.Combine(_dataPath, $"{id}.json");
        if (!File.Exists(filePath))
        {
            return Result<PatientProfile>.Failure("Patient not found.");
        }

        var patientJson = await File.ReadAllTextAsync(filePath);
        var patientProfile = JsonConvert.DeserializeObject<PatientProfile>(patientJson);
        return Result<PatientProfile>.Success(patientProfile);
    }

    public async Task<Result> SavePatient(PatientProfile patientProfile)
    {
        try
        {
            var filePath = Path.Combine(_dataPath, $"{patientProfile.Patient.PatientId}.json");
            var patientJson = JsonConvert.SerializeObject(patientProfile, Formatting.Indented);
            await File.WriteAllTextAsync(filePath, patientJson);
            return Result.Success();
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to save patient: {ex.Message}");
        }
    }

    public async Task<Result> UpdatePatient(PatientProfile patientProfile)
    {
        var filePath = Path.Combine(_dataPath, $"{patientProfile.Patient.PatientId}.json");
        if (!File.Exists(filePath))
        {
            return Result.Failure("Patient not found.");
        }

        var patientJson = JsonConvert.SerializeObject(patientProfile, Formatting.Indented);
        await File.WriteAllTextAsync(filePath, patientJson);
        return Result.Success();
    }
}
