namespace hrms_backend.Models.DTO.Games
{
    public class GameTypeDto
    {
        public int id { get; set; }
        public int noOfSlots { get; set; }
        public string gameName { get; set; }
        public int maxMembers { get; set; }
        public DateTime gameStartTime { get; set; }
        public DateTime gameEndTime { get; set; }
        public int duration { get; set; }
    }

    public class AddGameTypeDto
    {
        public int noOfSlots { get; set; }
        public string gameName { get; set; }
        public int maxMembers { get; set; }
        public DateTime gameStartTime { get; set; }
        public DateTime gameEndTime { get; set; }
        public int duration { get; set; }
    }
}
