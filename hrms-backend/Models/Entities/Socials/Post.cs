using hrms_backend.Models.Entities.Socials;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities
{
    [Table("posts")]
    public class Post
    {
        [Key]
        [Column("pk_post_id")]
        public Guid Id { get; set; }

        [ForeignKey("fk_author_id")]
        public Employees AuthorId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime PostDate { get; set; }
        public string Visibility { get; set; }
        public string Tags { get; set; }
        public long LikeCount { get; set; }
        public PostType Type { get; set; } //create enum for this 

        public virtual ICollection<Like> Likes { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }

    }
}
