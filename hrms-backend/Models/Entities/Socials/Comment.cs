using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities.Socials
{
    [Table("comments")]
    public class Comment
    {
        [Key]
        [Column("pk_comment_id")]
        public Guid Id { get; set; }

        public string Text { get; set; }
        public Guid PostId { get; set; }
        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }

        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public virtual Employees CommentedBy { get; set; }
    }
}
