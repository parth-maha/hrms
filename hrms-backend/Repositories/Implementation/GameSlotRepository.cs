using hrms_backend.Data;
using hrms_backend.Models.Entities.Games;
using Microsoft.EntityFrameworkCore;

namespace hrms_backend.Repositories.Implementation
{
    public class GameSlotRepository : IGameSlotRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public GameSlotRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddSlotAsync(List<GameSlots> slot)
        {
            await _dbContext.GameSlots.AddRangeAsync(slot);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveSlotsAsync(int id)
        {
            var slots = await _dbContext.GameSlots
                .Where(g => g.GameTypeId == id)
                .ToListAsync();

            if(slots.Any())
            {
                _dbContext.GameSlots.RemoveRange(slots);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
