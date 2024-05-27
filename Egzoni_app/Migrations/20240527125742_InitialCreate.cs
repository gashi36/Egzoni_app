using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Egzoni_app.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Kodi = table.Column<string>(type: "TEXT", nullable: true),
                    Tipi = table.Column<string>(type: "TEXT", nullable: true),
                    Masa = table.Column<string>(type: "TEXT", nullable: true),
                    Sasia = table.Column<decimal>(type: "TEXT", precision: 10, scale: 2, nullable: true),
                    Ngjyra = table.Column<string>(type: "TEXT", nullable: true),
                    CmimiIBlerjes = table.Column<decimal>(type: "TEXT", precision: 10, scale: 2, nullable: true),
                    CmimiIShitjes = table.Column<decimal>(type: "TEXT", precision: 10, scale: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
