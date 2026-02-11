using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class JobMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    pk_job_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    job_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PostedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsOpen = table.Column<bool>(type: "bit", nullable: false),
                    AttachedFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PocId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_jobs", x => x.pk_job_id);
                    table.ForeignKey(
                        name: "FK_jobs_employees_PocId",
                        column: x => x.PocId,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_jobs_employees_PostedById",
                        column: x => x.PostedById,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "job_referrals",
                columns: table => new
                {
                    pk_referral_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_job_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    referred_by = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    referred_to = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefferedToEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferredToCV = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferredById = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_referrals", x => x.pk_referral_id);
                    table.ForeignKey(
                        name: "FK_job_referrals_employees_referred_by",
                        column: x => x.referred_by,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_job_referrals_jobs_fk_job_id",
                        column: x => x.fk_job_id,
                        principalTable: "jobs",
                        principalColumn: "pk_job_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "job_reviewers",
                columns: table => new
                {
                    pk_job_reviewer_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_job_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reviewer_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_reviewers", x => x.pk_job_reviewer_id);
                    table.ForeignKey(
                        name: "FK_job_reviewers_employees_reviewer_id",
                        column: x => x.reviewer_id,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_job_reviewers_jobs_fk_job_id",
                        column: x => x.fk_job_id,
                        principalTable: "jobs",
                        principalColumn: "pk_job_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_shares",
                columns: table => new
                {
                    pk_job_share_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_job_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    shared_by = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    shared_to = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_shares", x => x.pk_job_share_id);
                    table.ForeignKey(
                        name: "FK_job_shares_employees_shared_by",
                        column: x => x.shared_by,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_job_shares_employees_shared_to",
                        column: x => x.shared_to,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_job_shares_jobs_fk_job_id",
                        column: x => x.fk_job_id,
                        principalTable: "jobs",
                        principalColumn: "pk_job_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_job_referrals_fk_job_id",
                table: "job_referrals",
                column: "fk_job_id");

            migrationBuilder.CreateIndex(
                name: "IX_job_referrals_referred_by",
                table: "job_referrals",
                column: "referred_by");

            migrationBuilder.CreateIndex(
                name: "IX_job_reviewers_fk_job_id",
                table: "job_reviewers",
                column: "fk_job_id");

            migrationBuilder.CreateIndex(
                name: "IX_job_reviewers_reviewer_id",
                table: "job_reviewers",
                column: "reviewer_id");

            migrationBuilder.CreateIndex(
                name: "IX_job_shares_fk_job_id",
                table: "job_shares",
                column: "fk_job_id");

            migrationBuilder.CreateIndex(
                name: "IX_job_shares_shared_by",
                table: "job_shares",
                column: "shared_by");

            migrationBuilder.CreateIndex(
                name: "IX_job_shares_shared_to",
                table: "job_shares",
                column: "shared_to");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_PocId",
                table: "jobs",
                column: "PocId");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_PostedById",
                table: "jobs",
                column: "PostedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "job_referrals");

            migrationBuilder.DropTable(
                name: "job_reviewers");

            migrationBuilder.DropTable(
                name: "job_shares");

            migrationBuilder.DropTable(
                name: "jobs");
        }
    }
}
