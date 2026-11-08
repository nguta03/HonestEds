using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HonestEds.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    FullReview = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tagline = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    DateCreated = table.Column<DateOnly>(type: "date", nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "Address", "Category", "DateCreated", "FullReview", "ImageUrl", "Location", "Rating", "Tagline", "Title" },
                values: new object[,]
                {
                    { 1, "123 King St W", "restaurant", new DateOnly(2026, 3, 10), "Your full review text here.", "", "Toronto, ON", 5.0, "Classical French cooking gets its crown back", "Maison Dorée" },
                    { 2, "", "Golf Course", new DateOnly(2026, 3, 8), "", "", "Toronto, ON", 4.0, "Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.", "Ridgecrest Golf & Country Club" },
                    { 3, "", "Restaurant", new DateOnly(2026, 3, 5), "", "", "Cambridge, ON", 5.0, "The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.", "Nori & Co. Omakase Bar" },
                    { 4, "", "Golf Course", new DateOnly(2026, 2, 28), "", "", "Halton Hills, ON", 5.0, "Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.", "Lakeview Links at Halton Hills" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Category",
                table: "Reviews",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_DateCreated",
                table: "Reviews",
                column: "DateCreated");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Location",
                table: "Reviews",
                column: "Location");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");
        }
    }
}
