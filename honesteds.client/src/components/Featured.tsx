import { useEffect, useState } from 'react';
import type { Review } from '../interfaces/Review';

function Featured() {
    const [review, setReview] = useState<Review>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getFeature().finally(() => setLoading(false));
        }, []);
    
    if(loading) return <p>Loading...</p>
    if (!review) return null;
    return (
        <>
            <section className="featured-section">
                <p className="section-label">Featured Review</p>
                <div className="featured-card">
                    <div className="img-placeholder-1 hero-img">🍽️</div>
                    <div className="hero-gradient"></div>
                    <div className="featured-content">
                        <span className="featured-badge">{review.category}</span>
                        <h1 className="featured-title">{review.title}</h1>
                        <div className="featured-stars">
                            {[...Array(Math.ceil(review.rating))].map((_, i) => {
                                const full = i < review.rating - 1;
                                return(<span key={i} className={`star ${full ? 'filled' : 'half'}`}>★</span>)
                            })}
                        </div>
                        <p className="featured-excerpt">
                            {review.tagline}
                        </p>
                        <div className="featured-meta">{review.dateCreated} &nbsp;·&nbsp; {review.location}</div>
                            <a href="#" className="btn-read">
                                Read Review
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
        </>
    );

    async function getFeature() {
        const response = await fetch('/api/review/featured');
        if (response.ok) {
            const data = await response.json();
            setReview(data);
        }
    }
}

export default Featured;