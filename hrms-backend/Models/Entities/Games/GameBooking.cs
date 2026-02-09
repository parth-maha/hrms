using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Games
{
    [Table("game_bookings")]
    public class GameBooking
    {
        [Key]
        [Column("pk_gb_id")]
        public Guid Id { get; set;  }

        public DateTime SlotDate { get; set;  }

        [Column("fk_booked_by")]
        public Guid BookedById { get; set; }
        [ForeignKey("BookedById")]
        public virtual Employees BookedBy { get; set; }

        [Column("fk_game_type")]
        public int GameTypeId { get; set; }
        [ForeignKey("GameTypeId")]
        public virtual GameType GameType { get; set; }

        public virtual ICollection<GameSlots> GameSlots { get; set; }
    }
}
