namespace MedAPI.Core.Entities;

public class Requisition
{
    public Requisition()
    {
        Tests = new List<Test>();
    }
    public Guid RequisitionId { get; set; }
    public DateTime DateSubmitted { get; set; }
    public string ReferringPhysician { get; set; }
    public List<Test> Tests { get; set; }
}