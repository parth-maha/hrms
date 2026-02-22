using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace hrms_backend.Models.Entities.Games
{
    [Table("game_type")]
    public class GameType
    {
        [Key]
        [Column("pk_game_type_id")]
        public int Id { get; set; }

        [Column("game_name")]
        public string GameName { get; set; }

        [Column("game_duration")]
        public int GameDuration { get; set; } // in minutes

        [Column("game_start_time")]
        public TimeSpan GameStartTime { get; set; }

        [Column("game_end_time")]
        public TimeSpan GameEndTime { get; set; }

        [Column("no_of_slots")]
        public int NoOfSlots { get; set; }

        [Column("max_members")]
        public int MaxMembers { get; set; }

        [Column("deleted_on")]
        public DateTime? DeletedOn { get; set; }

        [Column("is_deleted")]
        public bool IsDeleted { get; set; } = false;
    }
}