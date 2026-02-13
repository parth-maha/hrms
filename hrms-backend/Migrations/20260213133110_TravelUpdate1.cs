using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class TravelUpdate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_travel_allocations",
                table: "travel_allocations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_travel_allocations",
                table: "travel_allocations",
                column: "pk_ta_id");

            migrationBuilder.CreateIndex(
                name: "IX_travel_allocations_fk_travel_id",
                table: "travel_allocations",
                column: "fk_travel_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_travel_allocations",
                table: "travel_allocations");

            migrationBuilder.DropIndex(
                name: "IX_travel_allocations_fk_travel_id",
                table: "travel_allocations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_travel_allocations",
                table: "travel_allocations",
                columns: new[] { "fk_travel_id", "pk_ta_id" });
        }
    }
}
