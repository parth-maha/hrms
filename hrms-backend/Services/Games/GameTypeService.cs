using hrms_backend.Models.DTO.Games;
using hrms_backend.Models.Entities.Games;
using hrms_backend.Repositories;

namespace hrms_backend.Services.Games
{
    public class GameTypeService
    {
        private readonly ILogger<GameTypeService> _logger;
        private readonly IGameTypeRepository _gameTypeRepo;
        private readonly IGameSlotRepository _gameSlotRepo;
        public GameTypeService(ILogger<GameTypeService> logger, IGameTypeRepository gameTypeRepo, IGameSlotRepository gameSlotRepo)
        {
            _logger = logger;
            _gameTypeRepo = gameTypeRepo;
            _gameSlotRepo = gameSlotRepo;
        }

        public async Task<GameTypeDto> AddGame(AddGameTypeDto dto, Guid id)
        {
            TimeSpan totalAvailableTime = dto.gameEndTime - dto.gameStartTime;

            if (totalAvailableTime.TotalMinutes < 0)
            {
                totalAvailableTime = totalAvailableTime.Add(TimeSpan.FromDays(1));
            }

            int totalMinutes = (int)totalAvailableTime.TotalMinutes;
            int totalSlots = dto.duration > 0 ? totalMinutes / dto.duration : 0;

            var game = new GameType
            {
                GameName = dto.gameName,
                GameDuration = dto.duration,
                GameStartTime = dto.gameStartTime,
                GameEndTime = dto.gameEndTime,
                MaxMembers = dto.maxMembers,
                NoOfSlots = totalSlots,
            };
            await _gameTypeRepo.AddGameAsync(game);

            var startTime = dto.gameStartTime;
            var slots = new List<GameSlots>();
            for (var i = 1; i < totalSlots; i++)
            {
                var duration = TimeSpan.FromMinutes(game.GameDuration);
                var slotEndTime = startTime.Add(duration);

                if (slotEndTime > dto.gameEndTime) break;

                var slot = new GameSlots
                {
                    GameTypeId = game.Id,
                    StartTime = startTime,
                    EndTime = slotEndTime
                };

                slots.Add(slot);
                startTime = slotEndTime;
            }

            if (slots.Any())
            {
                await _gameSlotRepo.AddSlotAsync(slots);
            }

            _logger.LogInformation($"Game Added. Game Name:{game.GameName} by {id}");

            return mapToDto(game);
        }

        public async Task<List<GameTypeDto>> GetAllGames()
        {
            var games = await _gameTypeRepo.GetAllGameTypesAsync();
            return games.Select(mapToDto).ToList();
        }

        public async Task DeleteGame(int id, Guid empId)
        {
            var game = await _gameTypeRepo.FindByGameIdAsync(id);
            if (game == null)
                throw new Exception("Game not found");

            game.DeletedOn = DateTime.UtcNow; //soft delete
            game.IsDeleted = true;

            await _gameTypeRepo.UpdateGameAsync(game);
            await _gameSlotRepo.RemoveSlotsAsync(game.Id);
        }
        public GameTypeDto mapToDto(GameType game)
        {
            return new GameTypeDto
            {
                id = game.Id,
                gameName = game.GameName,
                duration = game.GameDuration,
                gameStartTime = game.GameStartTime,
                gameEndTime = game.GameEndTime,
                maxMembers = game.MaxMembers,
                noOfSlots = game.NoOfSlots,
            };
        }
    }
}