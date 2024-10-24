using MedAPI.Core.Entities;
using MedAPI.Core.Interfaces;
using MedAPI.Infrastructure.Configurations;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MedAPI.Infrastructure.Repositories;

public class FilePatientRepository : IPatientRepository
{
    private readonly string _dataFilePath;

    public FilePatientRepository(IOptions<PatientRepositoryOptions> options)
    {
        _dataFilePath = options.Value.DataFilePath;
    }

    public async Task<Patient> GetPatientByIdAsync(Guid id)
    {
        var patients = await LoadPatientsAsync();
        return patients.FirstOrDefault(p => p.PatientId == id);
    }

    public async Task AddPatientAsync(Patient patient)
    {
        var patients = await LoadPatientsAsync();
        patients.Add(patient);
        await SavePatientsAsync(patients);
    }

    private async Task<List<Patient>> LoadPatientsAsync()
    {
        if (!File.Exists(_dataFilePath))
            return new List<Patient>();

        var json = await File.ReadAllTextAsync(_dataFilePath);
        return JsonConvert.DeserializeObject<List<Patient>>(json);
    }

    private async Task SavePatientsAsync(List<Patient> patients)
    {
        var json = JsonConvert.SerializeObject(patients, Formatting.Indented);
        await File.WriteAllTextAsync(_dataFilePath, json);
    }
}