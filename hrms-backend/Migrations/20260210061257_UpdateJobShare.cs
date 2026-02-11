using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateJobShare : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_job_shares_employees_shared_to",
                table: "job_shares");

            migrationBuilder.DropIndex(
                name: "IX_job_shares_shared_to",
                table: "job_shares");

            migrationBuilder.DropColumn(
                name: "shared_to",
                table: "job_shares");

            migrationBuilder.AddColumn<string>(
                name: "SharedTo",
                table: "job_shares",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SharedTo",
                table: "job_shares");

            migrationBuilder.AddColumn<Guid>(
                name: "shared_to",
                table: "job_shares",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_job_shares_shared_to",
                table: "job_shares",
                column: "shared_to");

            migrationBuilder.AddForeignKey(
                name: "FK_job_shares_employees_shared_to",
                table: "job_shares",
                column: "shared_to",
                principalTable: "employees",
                principalColumn: "pk_employee_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
