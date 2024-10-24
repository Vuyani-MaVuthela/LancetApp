using System.ComponentModel.DataAnnotations;

namespace MedAPI.Application.DTOs;
public class TestDto
{
    public Guid TestId { get; set; }

    public string TestName { get; set; }

    public string Comment { get; set; }

    public int NormalRange { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Test result must be a positive number.")]
    public int TestResult { get; set; }
}
