using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class SoftDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_on",
                table: "system_configs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "system_configs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_on",
                table: "jobs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "jobs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_on",
                table: "job_shares",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "job_shares",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_on",
                table: "job_reviewers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "job_reviewers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_on",
                table: "job_referrals",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "job_referrals",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "deleted_on",
                table: "employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "employees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_system_configs_is_deleted",
                table: "system_configs",
                column: "is_deleted",
                filter: "[is_deleted] =0");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_is_deleted",
                table: "jobs",
                column: "is_deleted",
                filter: "[is_deleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_system_configs_is_deleted",
                table: "system_configs");

            migrationBuilder.DropIndex(
                name: "IX_jobs_is_deleted",
                table: "jobs");

            migrationBuilder.DropColumn(
                name: "deleted_on",
                table: "system_configs");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "system_configs");

            migrationBuilder.DropColumn(
                name: "deleted_on",
                table: "jobs");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "jobs");

            migrationBuilder.DropColumn(
                name: "deleted_on",
                table: "job_shares");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "job_shares");

            migrationBuilder.DropColumn(
                name: "deleted_on",
                table: "job_reviewers");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "job_reviewers");

            migrationBuilder.DropColumn(
                name: "deleted_on",
                table: "job_referrals");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "job_referrals");

            migrationBuilder.DropColumn(
                name: "deleted_on",
                table: "employees");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "employees");
        }
    }
}
