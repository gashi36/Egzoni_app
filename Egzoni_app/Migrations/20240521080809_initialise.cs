using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Egzoni_app.Migrations
{
    /// <inheritdoc />
    public partial class initialise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CmimiIShitjes",
                table: "Products",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CmimiIShitjes",
                table: "Products");
        }
    }
}
