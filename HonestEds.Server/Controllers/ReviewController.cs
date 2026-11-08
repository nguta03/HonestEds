using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace HonestEds.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {

        private readonly ILogger<ReviewController> _logger;
        private readonly AppDbContext _db;
        private readonly IMemoryCache _cache;

        public ReviewController(ILogger<ReviewController> logger, AppDbContext db, IMemoryCache cache)
        {
            _logger = logger;
            _db = db;
            _cache = cache;
        }

        

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _db.Reviews.FindAsync(id);
            
            if (review is null) return NotFound();
            return review;
        }

        //For home page
        [HttpGet("Featured")]
        public async Task<ActionResult<Review>> GetFeatured()
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var review = await _cache.GetOrCreateAsync($"featured:{today}", async entry =>
            {
                // Expire at the next UTC midnight, when the featured review changes
                entry.AbsoluteExpiration = new DateTimeOffset(DateTime.UtcNow.Date.AddDays(1), TimeSpan.Zero);

                var withImages = _db.Reviews.Where(r => r.ImageUrl != null);

                var count = await withImages.CountAsync();
                if (count == 0)
                {
                    // Don't remember "nothing to feature" for long
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(10);
                    return null;
                }

                var index = today.DayNumber % count;

                return await withImages
                    .OrderBy(r => r.Id)
                    .Skip(index)
                    .FirstAsync();
            });

            return review is null ? NotFound() : review;
        }

        //For home page
        [HttpGet("Latest")]
        public async Task<ActionResult<List<Review>>> GetLatest()
        {
            var result = await _cache.GetOrCreateAsync("latest", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);

                return await _db.Reviews
                .AsNoTracking()
                .OrderByDescending(r => r.DateCreated)
                .ThenByDescending(r => r.Id)
                .Take(9)
                .ToListAsync();

            // could return only what card needs
            });

            return result!;
        }

        //For list of reviews
        [HttpGet("Reviews")]
        public async Task<List<Review>> GetReviews(string? category, string? location, double? minRating,
            DateOnly? dateFrom, DateOnly? dateTo)
        {

            var query = _db.Reviews.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(category)) query = query.Where(r => r.Category == category);
            if (!string.IsNullOrEmpty(location)) query = query.Where(r => r.Location == location);
            if (minRating.HasValue) query = query.Where(r => r.Rating >= minRating);
            if (dateFrom.HasValue) query = query.Where(r => r.DateCreated >= dateFrom);
            if (dateTo.HasValue) query = query.Where(r => r.DateCreated <= dateTo);

            return await query.ToListAsync();
            
        }

        //Locations for filtering
        [HttpGet("locations")]
        public async Task<ActionResult<List<string>>> GetLocations() {
            var result = await _cache.GetOrCreateAsync("locations", async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);

                return await _db.Reviews
                    .Select(r => r.Location)
                    .Distinct()
                    .OrderBy(l => l)
                    .ToListAsync();
            });

            return result!;
        }

        //Remove cache when editing db
        //_cache.Remove("latest");
        //_cache.Remove($"featured:{today}");
        //_cache.Remove("locations");


    }
}
