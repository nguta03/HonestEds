namespace HonestEds.Server
{
    public class Review
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? FullReview { get; set; }

        public string? Tagline { get; set; }

        public string? Category { get; set; }

        public string? Location { get; set; }

        public string? Address { get; set; }

        public string? DateCreated { get; set; }

        public double Rating { get; set; }

        public string? ImageUrl { get; set; }

    }
}
