namespace MedAPI.Application.DTOs;
public class PatientDto
{
    public Guid PatientId { get; set; }

    public string Name { get; set; }

    public string Address { get; set; }

    public List<RequisitionDto> Requisitions { get; set; } = new List<RequisitionDto>();
    public string AvatarFilePath { get; set; } 

}
