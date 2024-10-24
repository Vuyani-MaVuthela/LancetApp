using MedAPI.Application.DTOs;
using MedAPI.Core.Entities;
using MedAPI.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MedAPI.API.Controllers;
/// <summary>
/// Handles requests related to patient.
/// </summary>
[ApiController]
[Route("api/patients")]
public class PatientController : ControllerBase
{
    private readonly IPatientService _patientService;
    private readonly ILogger<PatientController> _logger;
    /// <summary>
    /// Handles requests related to patient.
    /// </summary>
    public PatientController(IPatientService patientService, ILogger<PatientController> logger)
    {
        _patientService = patientService;
        _logger = logger;
    }

    /// <summary>
    /// Gets all patients.
    /// </summary>
    /// <returns>A list of patients</returns>
    [HttpGet]
    [Route("")]
    public async Task<ActionResult<IEnumerable<PatientDto>>> GetAllPatients()
    {
        var patients = await _patientService.GetAllPatients();
        return Ok(patients);
    }

    /// <summary>
    /// Retrieves a patient by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the patient.</param>
    /// <returns>The patient details.</returns>

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPatientById(Guid id)
    {
        var result = await _patientService.GetPatientById(id);
        if (result.IsFailure)
        {
            return NotFound(result.ErrorMessage);
        }
        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new patient profile.
    /// </summary>
    /// <param name="patientProfile">The patient profile to be created.</param>
    /// <returns>The created patient profile.</returns>
    /// <response code="201">Returns the created patient profile.</response>
    /// <response code="400">If the patient profile is invalid.</response>

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> CreatePatient([FromBody] PatientProfile patientProfile)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogInformation(patientProfile.ToString());
            return BadRequest(ModelState);
        }


        try
        {
            var result = await _patientService.SavePatient(patientProfile);
            if (result.IsFailure)
            {
                return BadRequest(result.ErrorMessage);
            }
            return CreatedAtAction(nameof(GetPatientById), new { id = patientProfile.Patient.PatientId }, patientProfile);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching patients.");
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Updates an existing patient profile.
    /// </summary>
    /// <param name="id">The unique identifier of the patient to update.</param>
    /// <param name="patientProfile">The updated patient profile.</param>
    /// <returns>No content if the update is successful.</returns>
    /// <response code="204">Returns no content if successful.</response>
    /// <response code="404">If the patient profile is not found.</response>
    /// <response code="400">If the patient profile is invalid.</response>

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePatientById(Guid id, [FromBody] PatientProfile patientProfile)
    {
        if (id != patientProfile.Patient.PatientId)
        {
            return BadRequest("Patient ID mismatch.");
        }

        var result = await _patientService.UpdatePatient(patientProfile);
        if (result.IsFailure)
        {
            return BadRequest(result.ErrorMessage);
        }

        return NoContent(); 
    }
}