using Microsoft.AspNetCore.Mvc;

namespace HonestEds.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {

        private readonly ILogger<ReviewController> _logger;

        public ReviewController(ILogger<ReviewController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:int}")]
        public Review Get()
        {
            //call model
            
            return new Review
            {
                Id = 0,
                Title = "",
                Tagline = "",
                FullReview = "",
                Category = "",
                Location = "",
                Address = "",
                DateCreated = "",
                Rating = 5,
                ImageUrl = ""
            };
        }

        //For home page
        [HttpGet("Featured")]
        public Review GetFeature()
        {
            //call model
            return new Review
            {
                Id = 4,
                Title = "Maison Dorée: Where Classical French Cooking Gets Its Crown Back",
                Tagline = "A quietly extraordinary experience tucked into a Victorian townhouse — the duck confit alone justifies the reservation, but it's the effortless service and unhurried pace that linger long after the last bite.",
                FullReview = "",
                Category = "Restaurant",
                Location = "Toronto, ON",
                Address = "",
                DateCreated = "March 10, 2026",
                Rating = 4.5,
                ImageUrl = ""
            };
        }

        //For home page
        [HttpGet("Latest")]
        public List<Review> GetLatest()
        {
            //call model
            return new List<Review>
            {
                new Review
                {
                Id = 1,
                Title = "Ridgecrest Golf & Country Club",
                Tagline = "Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Toronto, ON",
                Address = "",
                DateCreated = "Mar 8, 2026",
                Rating = 4,
                ImageUrl = ""
                },
                new Review
                {
                Id = 2,
                Title = "Nori & Co. Omakase Bar",
                Tagline = "The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.",
                FullReview = "",
                Category = "Restaurant",
                Location = "Cambridge, ON",
                Address = "",
                DateCreated = "Mar 5, 2026",
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 3,
                Title = "Lakeview Links at Halton Hills",
                Tagline = "Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Halton Hills, ON",
                Address = "",
                DateCreated = "Feb 28, 2026",
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 1,
                Title = "Ridgecrest Golf & Country Club",
                Tagline = "Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Toronto, ON",
                Address = "",
                DateCreated = "Mar 8, 2026",
                Rating = 4,
                ImageUrl = ""
                },
                new Review
                {
                Id = 2,
                Title = "Nori & Co. Omakase Bar",
                Tagline = "The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.",
                FullReview = "",
                Category = "Restaurant",
                Location = "Cambridge, ON",
                Address = "",
                DateCreated = "Mar 5, 2026",
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 3,
                Title = "Lakeview Links at Halton Hills",
                Tagline = "Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Halton Hills, ON",
                Address = "",
                DateCreated = "Feb 28, 2026",
                Rating = 1,
                ImageUrl = ""
                }
            };
        }

        //For list of reviews
        [HttpGet("Reviews")]
        public List<Review> GetReviews(string? category, string? location, double? minRating,
            DateOnly? dateFrom, DateOnly? dateTo)
        {

            // var query = _reviews.AsQueryable();

            // if (!string.IsNullOrEmpty(category)) query = query.Where(r => r.Category == category);
            // if (!string.IsNullOrEmpty(location)) query = query.Where(r => r.Location == location);
            // if (minRating.HasValue) query = query.Where(r => r.Rating >= minRating);
            // if (from.HasValue) query = query.Where(r => r.Date >= from);
            // if (to.HasValue) query = query.Where(r => r.Date <= to);

            // return Ok(query.ToList());
            //call model

            _logger.LogInformation("Filters: {Category} {Location} {MinRating} {From} {To}",
                category, location, minRating, dateFrom, dateTo);

            return new List<Review>
            {
                new Review
                {
                Id = 1,
                Title = "Ridgecrest Golf & Country Club",
                Tagline = "Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Toronto, ON",
                Address = "",
                DateCreated = "Mar 8, 2026",
                Rating = 4,
                ImageUrl = ""
                },
                new Review
                {
                Id = 2,
                Title = "Nori & Co. Omakase Bar",
                Tagline = "The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.",
                FullReview = "",
                Category = "Restaurant",
                Location = "Cambridge, ON",
                Address = "",
                DateCreated = "Mar 5, 2026",
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 3,
                Title = "Lakeview Links at Halton Hills",
                Tagline = "Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Halton Hills, ON",
                Address = "",
                DateCreated = "Feb 28, 2026",
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 4,
                Title = "Ridgecrest Golf & Country Club",
                Tagline = "Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Toronto, ON",
                Address = "",
                DateCreated = "Mar 8, 2026",
                Rating = 4,
                ImageUrl = ""
                },
                new Review
                {
                Id = 5,
                Title = "Nori & Co. Omakase Bar",
                Tagline = "The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.",
                FullReview = "",
                Category = "Restaurant",
                Location = "Cambridge, ON",
                Address = "",
                DateCreated = "Mar 5, 2026",
                Rating = 5,
                ImageUrl = ""
                },
                new Review
                {
                Id = 6,
                Title = "Lakeview Links at Halton Hills",
                Tagline = "Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.",
                FullReview = "",
                Category = "Golf Course",
                Location = "Halton Hills, ON",
                Address = "",
                DateCreated = "Feb 28, 2026",
                Rating = 1,
                ImageUrl = ""
                }
            };
        }
    }
}
