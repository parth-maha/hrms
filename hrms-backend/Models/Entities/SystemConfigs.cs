using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hrms_backend.Models.Entities
{
    [Table("system_configs")]
    public class SystemConfigs
    {
        [Key]
        [Column("pk_system_config_id")]
        public int Id { get; set; }

        [Column("fk_system_id")]
        public int SystemId { get; set; }
        [ForeignKey("SystemId")]
        public SystemInfo System { get; set; }

        [Column("fk_created_by")]
        public Guid CreatedById { get; set; }
        [ForeignKey("CreatedById")]

        [Column("deleted_on")]
        public DateTime DeletedOn { get; set; }

        [Column("is_deleted")]
        public bool IsDeleted { get; set; }
        public virtual Employees CreatedBy { get; set; }
        public string ConfigId { get; set; }
        public string ConfigName { get; set; }
        public string ConfigValue { get; set; }
    }
}
