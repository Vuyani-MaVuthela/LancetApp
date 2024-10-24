using MedAPI.Core.Common;

namespace MedAPI.Core.Interfaces;

public interface IAvatarService
{
    Task<Result<string>> GetAvatarById(Guid patientId);
    Task<Result> DeleteAvatarById(Guid patientId);
}
