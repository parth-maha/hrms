using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class JobUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "job_id",
                table: "jobs",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_job_id",
                table: "jobs",
                column: "job_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_jobs_job_id",
                table: "jobs");

            migrationBuilder.AlterColumn<string>(
                name: "job_id",
                table: "jobs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
