using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Games
{
    [Table("game_interest")]
    public class GameInterest
    {
        [Key]
        [Column("pk_game_interest_id")]
        public Guid Id { get; set; }

        [Column("fk_employee_id")]
        public Guid EmployeeId { get; set; }

        [Column("fk_game_id")]
        public int GameId { get; set; }

        public virtual Employees Employee { get; set; }
        public virtual GameType GameType { get; set; }
    }
}
