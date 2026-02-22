namespace hrms_backend.Models.DTO.Games
{
    public class GameTypeDto
    {
        public int id { get; set; }
        public int noOfSlots { get; set; }
        public string gameName { get; set; }
        public int maxMembers { get; set; }
        public TimeSpan gameStartTime { get; set; }
        public TimeSpan gameEndTime { get; set; }
        public int duration { get; set; }
    }

    public class AddGameTypeDto
    {
        public string gameName { get; set; }
        public int maxMembers { get; set; }
        public TimeSpan gameStartTime { get; set; }
        public TimeSpan gameEndTime { get; set; }
        public int duration { get; set; }
    }
}