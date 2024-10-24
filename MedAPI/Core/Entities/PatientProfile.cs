namespace MedAPI.Core.Entities;

public class PatientProfile
{
    public PatientProfile()
    {
        Requisitions = new List<Requisition>();
    }

    public Patient Patient { get; set; }
    public List<Requisition> Requisitions { get; set; }
    public string AvatarFilePath { get; set; } // Store avatar file path
}