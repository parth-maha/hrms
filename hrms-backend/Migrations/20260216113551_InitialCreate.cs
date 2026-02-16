using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrms_backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    pk_role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.pk_role_id);
                });

            migrationBuilder.CreateTable(
                name: "system_info",
                columns: table => new
                {
                    pk_system_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    system_name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_system_info", x => x.pk_system_id);
                });

            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    pk_employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RolesId = table.Column<int>(type: "int", nullable: false),
                    Dob = table.Column<DateTime>(type: "Date", nullable: false),
                    JoiningDate = table.Column<DateTime>(type: "Date", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PanNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AadharNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BloodGroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankAccNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankIFSC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankBranch = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.pk_employee_id);
                    table.ForeignKey(
                        name: "FK_employees_employees_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "roles",
                        principalColumn: "pk_role_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    pk_job_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    job_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PostedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsOpen = table.Column<bool>(type: "bit", nullable: false),
                    AttachedFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PocId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false)
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
                name: "refresh_tokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByIp = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Revoked = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevokedByIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_refresh_tokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_refresh_tokens_employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "system_configs",
                columns: table => new
                {
                    pk_system_config_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fk_system_id = table.Column<int>(type: "int", nullable: false),
                    fk_created_by = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    ConfigId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfigName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfigValue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_system_configs", x => x.pk_system_config_id);
                    table.ForeignKey(
                        name: "FK_system_configs_employees_fk_created_by",
                        column: x => x.fk_created_by,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_system_configs_system_info_fk_system_id",
                        column: x => x.fk_system_id,
                        principalTable: "system_info",
                        principalColumn: "pk_system_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "travel_plan",
                columns: table => new
                {
                    pk_travel_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    end_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travel_plan", x => x.pk_travel_id);
                    table.ForeignKey(
                        name: "FK_travel_plan_employees_CreatedById",
                        column: x => x.CreatedById,
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
                    fk_referred_by = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    referred_to = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    RefferedToEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReferredToCV = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_referrals", x => x.pk_referral_id);
                    table.ForeignKey(
                        name: "FK_job_referrals_employees_fk_referred_by",
                        column: x => x.fk_referred_by,
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
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
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
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    SharedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SharedTo = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                        name: "FK_job_shares_jobs_fk_job_id",
                        column: x => x.fk_job_id,
                        principalTable: "jobs",
                        principalColumn: "pk_job_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "hr_travel_documents",
                columns: table => new
                {
                    pk_htd_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_travel_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TravelPlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    uploaded_by = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    owner_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    file_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uploaded_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hr_travel_documents", x => x.pk_htd_id);
                    table.ForeignKey(
                        name: "FK_hr_travel_documents_employees_uploaded_by",
                        column: x => x.uploaded_by,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_hr_travel_documents_travel_plan_TravelPlanId",
                        column: x => x.TravelPlanId,
                        principalTable: "travel_plan",
                        principalColumn: "pk_travel_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "travel_allocations",
                columns: table => new
                {
                    pk_ta_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_travel_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fk_employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    deleted_on = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeesId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travel_allocations", x => x.pk_ta_id);
                    table.ForeignKey(
                        name: "FK_travel_allocations_employees_EmployeesId",
                        column: x => x.EmployeesId,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id");
                    table.ForeignKey(
                        name: "FK_travel_allocations_employees_fk_employee_id",
                        column: x => x.fk_employee_id,
                        principalTable: "employees",
                        principalColumn: "pk_employee_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_travel_allocations_travel_plan_fk_travel_id",
                        column: x => x.fk_travel_id,
                        principalTable: "travel_plan",
                        principalColumn: "pk_travel_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_employees_EmployeeId",
                table: "employees",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_employees_ManagerId",
                table: "employees",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_employees_RolesId",
                table: "employees",
                column: "RolesId");

            migrationBuilder.CreateIndex(
                name: "IX_hr_travel_documents_TravelPlanId",
                table: "hr_travel_documents",
                column: "TravelPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_hr_travel_documents_uploaded_by",
                table: "hr_travel_documents",
                column: "uploaded_by");

            migrationBuilder.CreateIndex(
                name: "IX_job_referrals_fk_job_id",
                table: "job_referrals",
                column: "fk_job_id");

            migrationBuilder.CreateIndex(
                name: "IX_job_referrals_fk_referred_by",
                table: "job_referrals",
                column: "fk_referred_by");

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
                name: "IX_jobs_is_deleted",
                table: "jobs",
                column: "is_deleted",
                filter: "[is_deleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_job_id",
                table: "jobs",
                column: "job_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_jobs_PocId",
                table: "jobs",
                column: "PocId");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_PostedById",
                table: "jobs",
                column: "PostedById");

            migrationBuilder.CreateIndex(
                name: "IX_refresh_tokens_EmployeeId",
                table: "refresh_tokens",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_system_configs_fk_created_by",
                table: "system_configs",
                column: "fk_created_by");

            migrationBuilder.CreateIndex(
                name: "IX_system_configs_fk_system_id",
                table: "system_configs",
                column: "fk_system_id");

            migrationBuilder.CreateIndex(
                name: "IX_system_configs_is_deleted",
                table: "system_configs",
                column: "is_deleted",
                filter: "[is_deleted] =0");

            migrationBuilder.CreateIndex(
                name: "IX_travel_allocations_EmployeesId",
                table: "travel_allocations",
                column: "EmployeesId");

            migrationBuilder.CreateIndex(
                name: "IX_travel_allocations_fk_employee_id",
                table: "travel_allocations",
                column: "fk_employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_travel_allocations_fk_travel_id",
                table: "travel_allocations",
                column: "fk_travel_id");

            migrationBuilder.CreateIndex(
                name: "IX_travel_plan_CreatedById",
                table: "travel_plan",
                column: "CreatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "hr_travel_documents");

            migrationBuilder.DropTable(
                name: "job_referrals");

            migrationBuilder.DropTable(
                name: "job_reviewers");

            migrationBuilder.DropTable(
                name: "job_shares");

            migrationBuilder.DropTable(
                name: "refresh_tokens");

            migrationBuilder.DropTable(
                name: "system_configs");

            migrationBuilder.DropTable(
                name: "travel_allocations");

            migrationBuilder.DropTable(
                name: "jobs");

            migrationBuilder.DropTable(
                name: "system_info");

            migrationBuilder.DropTable(
                name: "travel_plan");

            migrationBuilder.DropTable(
                name: "employees");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
