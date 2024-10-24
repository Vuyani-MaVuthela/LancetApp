using MedAPI.Application.DTOs;

namespace MedAPI.API.DTOs;

public class GetPatientDto
{
    public Guid PatientId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }  // Could also be a separate DTO if necessary
    public string AvatarUrl { get; set; } // The URL or file path of the avatar image

    public List<RequisitionDto> Requisitions { get; set; }
}