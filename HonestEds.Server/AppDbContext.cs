using Microsoft.EntityFrameworkCore;

namespace HonestEds.Server
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Review> Reviews => Set<Review>();

        protected override void OnModelCreating(ModelBuilder b)
        {
            b.Entity<Review>(e =>
            {
                e.Property(r => r.Title).HasMaxLength(200);
                e.Property(r => r.Tagline).HasMaxLength(300);
                e.Property(r => r.Category).HasMaxLength(50);
                e.Property(r => r.Location).HasMaxLength(100);
                e.Property(r => r.Address).HasMaxLength(300);
                e.Property(r => r.ImageUrl).HasMaxLength(500);
                // FullReview stays nvarchar(max) for long text

                e.HasIndex(r => r.Category);
                e.HasIndex(r => r.Location);
                e.HasIndex(r => r.DateCreated);
            });

            b.Entity<Review>().HasData(
                new Review
                {
                Id = 1,
                Title = "Maison Dorée",
                Tagline = "Classical French cooking gets its crown back",
                FullReview = "Your full review text here.",
                Category = "restaurant",
                Location = "Toronto, ON",
                Address = "123 King St W",
                DateCreated = new DateOnly(2026, 3, 10),
                Rating = 5.0,
                ImageUrl = ""
                },
                new Review
                {
                Id = 2,
                Title = "Ridgecrest Golf & Country Club",
                Tagline = "Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Toronto, ON",
                Address = "",
                DateCreated = new DateOnly(2026, 3, 8),
                Rating = 4,
                ImageUrl = ""
                },
                new Review
                {
                Id = 3,
                Title = "Nori & Co. Omakase Bar",
                Tagline = "The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.",
                FullReview = "",
                Category = "Restaurant",
                Location = "Cambridge, ON",
                Address = "",
                DateCreated = new DateOnly(2026, 3, 5),
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 4,
                Title = "Lakeview Links at Halton Hills",
                Tagline = "Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Halton Hills, ON",
                Address = "",
                DateCreated = new DateOnly(2026, 2, 28),
                Rating = 5,
                ImageUrl = ""
                }

            );
        }
    }
}