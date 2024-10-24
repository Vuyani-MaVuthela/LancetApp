namespace MedAPI.Core.Entities;
public class Patient
{
    public Guid PatientId { get; set; }
    public string PatientName { get; set; }
    public Address PatientAddress { get; set; }
}