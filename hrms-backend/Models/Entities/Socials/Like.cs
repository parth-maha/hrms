using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Socials
{
    [Table("likes")]
    public class Like
    {
        [Key]
        [Column("pk_like_id")]
        public Guid Id { get; set; }

        public Guid PostId { get; set; }
        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }

        [ForeignKey("fk_liked_by")]
        public Guid LikeById { get; set; }
        public virtual Employees LikedBy { get; set; }
    }
}
