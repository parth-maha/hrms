using hrms_backend.Models.Entities.Games;

namespace hrms_backend.Repositories
{
    public interface IGameSlotRepository
    {
        Task AddSlotAsync(List<GameSlots> slot);
        Task RemoveSlotsAsync(int id);  // remove all slots for a game
    }
}
