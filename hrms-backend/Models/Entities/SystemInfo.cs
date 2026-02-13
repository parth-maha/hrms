using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace hrms_backend.Models.Entities
{
    [Table("system_info")]
    public class SystemInfo
    {
        [Key]
        [Column("pk_system_id")]
        public int Id { get; set; }

        [Column("system_name")]
        public string SystemName { get; set; }

        [JsonIgnore]
        public virtual IList<SystemConfigs> SystemConfigs { get; set; } = new List<SystemConfigs>();
    }
}
