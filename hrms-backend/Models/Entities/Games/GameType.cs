using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace hrms_backend.Models.Entities.Games
{
    [Table("game_type")]
    public class GameType
    {
        [Key]
        [Column("pk_game_type_id")]
        public int Id { get; set;  }

        public string GameName { get; set; }
        public int GameDuration { get; set; }

        public DateTime GameStartTime { get; set; }
        public DateTime GameEndTime { get; set; }
        public int NoOfSlots { get; set;  }

        public int MaxMembers { get; set;  }
    }
}
