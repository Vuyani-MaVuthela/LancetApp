namespace MedAPI.Application.DTOs;
public class RequisitionDto
{
    public Guid RequisitionId { get; set; }

    public DateTime DateSubmitted { get; set; }

    public string ReferringPhysician { get; set; }

    public List<TestDto> Tests { get; set; } = new List<TestDto>();
}
