using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class ReferralUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReferredById",
                table: "job_referrals");

            migrationBuilder.AddColumn<DateTime>(
                name: "SharedTime",
                table: "job_shares",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SharedTime",
                table: "job_shares");

            migrationBuilder.AddColumn<Guid>(
                name: "ReferredById",
                table: "job_referrals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
