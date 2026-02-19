using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class GameType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_employee_travel_documents_fk_expense_id",
                table: "employee_travel_documents");

            migrationBuilder.AlterColumn<Guid>(
                name: "fk_expense_id",
                table: "employee_travel_documents",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "game_type",
                columns: table => new
                {
                    pk_game_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    game_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    game_duration = table.Column<int>(type: "int", nullable: false),
                    game_start_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    game_end_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    no_of_slots = table.Column<int>(type: "int", nullable: false),
                    max_members = table.Column<int>(type: "int", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: true),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_game_type", x => x.pk_game_type_id);
                });

            migrationBuilder.CreateTable(
                name: "game_interest",
                columns: table => new
                {
                    pk_game_interest_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_game_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_game_interest", x => x.pk_game_interest_id);
                    table.ForeignKey(
                        name: "FK_game_interest_employees_fk_employee_id",
                        column: x => x.fk_employee_id,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_game_interest_game_type_fk_game_id",
                        column: x => x.fk_game_id,
                        principalTable: "game_type",
                        principalColumn: "pk_game_type_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "game_slots",
                columns: table => new
                {
                    pk_gs_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_game_type_id = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_game_slots", x => x.pk_gs_id);
                    table.ForeignKey(
                        name: "FK_game_slots_game_type_fk_game_type_id",
                        column: x => x.fk_game_type_id,
                        principalTable: "game_type",
                        principalColumn: "pk_game_type_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_employee_travel_documents_fk_expense_id",
                table: "employee_travel_documents",
                column: "fk_expense_id",
                unique: true,
                filter: "[fk_expense_id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_game_interest_fk_employee_id",
                table: "game_interest",
                column: "fk_employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_game_interest_fk_game_id",
                table: "game_interest",
                column: "fk_game_id");

            migrationBuilder.CreateIndex(
                name: "IX_game_slots_fk_game_type_id",
                table: "game_slots",
                column: "fk_game_type_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "game_interest");

            migrationBuilder.DropTable(
                name: "game_slots");

            migrationBuilder.DropTable(
                name: "game_type");

            migrationBuilder.DropIndex(
                name: "IX_employee_travel_documents_fk_expense_id",
                table: "employee_travel_documents");

            migrationBuilder.AlterColumn<Guid>(
                name: "fk_expense_id",
                table: "employee_travel_documents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_employee_travel_documents_fk_expense_id",
                table: "employee_travel_documents",
                column: "fk_expense_id",
                unique: true);
        }
    }
}
