using MedAPI.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MedAPI.API.Controllers;
/// <summary>
/// Handles requests related to patient avatars.
/// </summary>

[ApiController]
[Route("api/avatars")]
public class AvatarController : ControllerBase
{
    private readonly IAvatarService _avatarService;
    private readonly ILogger<PatientController> _logger;
    /// <summary>
    /// Handles requests related to patient avatars.
    /// </summary>
    public AvatarController(IAvatarService avatarService, ILogger<PatientController> logger)
    {
        _avatarService = avatarService;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves the avatar for a specific patient.
    /// </summary>
    /// <param name="id">The unique identifier of the patient.</param>
    /// <returns>The avatar image.</returns>
    /// <response code="200">Returns the avatar image.</response>
    /// <response code="404">If the avatar is not found.</response>

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAvatarById(Guid id)
    {
        var result = await _avatarService.GetAvatarById(id);
        if (result.IsFailure)
        {
            return NotFound(result.ErrorMessage);
        }

        var image = System.IO.File.OpenRead(result.Value);
        return File(image, "image/jpeg");
    }

    /// <summary>
    /// Delete the avatar for a specific patient.
    /// </summary>
    /// <param name="id">The unique identifier of the patient.</param>
    /// <returns>The avatar image.</returns>
    /// <response code="200">Returns the avatar image.</response>
    /// <response code="404">If the avatar is not found.</response>

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAvatarById(Guid id)
    {
        var result = await _avatarService.DeleteAvatarById(id);
        if (result.IsFailure)
        {
            return NotFound(result.ErrorMessage);
        }

        return NoContent();
    }
}
