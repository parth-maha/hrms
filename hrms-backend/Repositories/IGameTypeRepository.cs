using hrms_backend.Models.Entities.Games;

namespace hrms_backend.Repositories
{
    public interface IGameTypeRepository
    {
        Task AddGameAsync(GameType game);
        Task UpdateGameAsync(GameType game);

        Task<GameType?> FindByGameIdAsync(int id);

        Task<List<GameType>> GetAllGameTypesAsync();
    }
}
