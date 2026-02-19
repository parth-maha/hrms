using hrms_backend.Data;
using hrms_backend.Models.Entities.Games;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class GameTypeRepository : IGameTypeRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public GameTypeRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddGameAsync(GameType game)
        {
            await _dbContext.GameType.AddAsync(game);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateGameAsync(GameType game)
        {
            _dbContext.GameType.Update(game);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<GameType?> FindByGameIdAsync(int id)
        {
            return await _dbContext.GameType
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<List<GameType>> GetAllGameTypesAsync()
        {
            return await _dbContext.GameType.ToListAsync();
        }
    }
}
