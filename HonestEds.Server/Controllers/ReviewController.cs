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
        [HttpGet("latest")]
        public Review GetLatest()
        {
            //call model
            
            return new Review
            {
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
    }
}
