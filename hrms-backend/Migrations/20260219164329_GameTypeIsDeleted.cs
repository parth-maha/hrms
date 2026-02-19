using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class GameTypeIsDeleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_game_type_is_deleted",
                table: "game_type",
                column: "is_deleted",
                filter: "[is_deleted] =0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_game_type_is_deleted",
                table: "game_type");
        }
    }
}
