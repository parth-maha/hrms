using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities
{
    [Table("roles")]
    public class Roles
    {
        [Key]
        [Column("pk_role_id")]
        public int Id { get; set; }

        public string Role { get; set; }
    }
}
