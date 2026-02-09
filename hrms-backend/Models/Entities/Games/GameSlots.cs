using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Games
{
    [Table("game_slots")]
    public class GameSlots
    {
        [Key]
        [Column("pk_gs_id")]
        public Guid Id { get; set; }

        [Column("fk_game_booking_id")]
        public Guid GameBookingId { get; set; }
        [ForeignKey("BookingId")]
        public virtual GameBooking GameBooking { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        [Column("member_id")]
        public Guid MemberId { get; set;  }
        [ForeignKey("MemberId")]
        public virtual Employees Member { get; set;  }
    }
}
