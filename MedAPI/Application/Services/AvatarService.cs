using MedAPI.Core.Common;
using MedAPI.Core.Interfaces;

namespace MedAPI.Application.Services;

public class AvatarService : IAvatarService
{
    private readonly string _avatarsPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "Avatars");

    public async Task<Result<string>> GetAvatarById(Guid patientId)
    {
        var filePath = Path.Combine(_avatarsPath, $"{patientId}.jpeg");
        if (!File.Exists(filePath))
        {
            return Result<string>.Failure("Avatar not found.");
        }
        return Result<string>.Success(filePath);
    }

    public async Task<Result> DeleteAvatarById(Guid patientId)
    {
        var filePath = Path.Combine(_avatarsPath, $"{patientId}.jpeg");
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
            return Result.Success();
        }
        return Result.Failure("Avatar not found.");
    }
}
