using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Egzoni_app.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
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
                    Sasia = table.Column<string>(type: "TEXT", nullable: true),
                    Ngjyra = table.Column<string>(type: "TEXT", nullable: true),
                    CmimiIBlerjes = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
