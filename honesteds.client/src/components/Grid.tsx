import { useEffect, useState } from 'react';
import type { Review } from '../interfaces/Review';
// <card></card>
// <card></card>
// <card></card>
//<pagination></pagination>         Note: change pagination to backend

function Grid() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getLatest().finally(() => setLoading(false));
        }, []);
    
    //pagination
    const reviewsPerPage = 3
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const currentReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)

    if(loading) return <p>Loading...</p>
    if (!reviews) return null;
    return (
        <>
            <section className="reviews-section">
                <p className="section-label">Latest Reviews</p>
                <div className="reviews-grid">
                    {currentReviews.map(review => (
                        <article className="review-card" key={review.id}>
                            <div className="card-img-wrap">
                                <div className="img-placeholder-2">⛳</div>
                                <span className="card-category">{review.category}</span>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">{review.title}</h2>
                                <div className="card-stars">
                                    {[...Array(Math.ceil(review.rating))].map((_, i) => {
                                        const starNum = i + 1;
                                        const full = review.rating >= starNum;
                                        const half =
                                            review.rating >= starNum - 0.5 &&
                                            review.rating < starNum;
                                        return(<span key={i} className={`star ${
                                            full ? "filled" : half ? "half" : "empty"
                                        }`}>★</span>)
                                    })}
                                    <span className="card-rating-text">{review.rating} / 5</span>
                                </div>
                            <p className="card-excerpt">{review.tagline}</p>
                            <div className="card-footer">
                                <span className="card-location">{review.location}</span>
                                <span className="card-date">{review.dateCreated}</span>
                            </div>
                        </div>
                    </article>
                    ))}
                
                    </div>
                </section>
                
                <div className="pagination-section">
                    <button
                        className="pag-btn"
                        aria-label="Previous"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={`pag-btn ${
                                currentPage === index + 1 ? "active" : ""
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="pag-btn"
                        aria-label="Next"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
        </>
    );

    async function getLatest() {
        const response = await fetch('/api/review/latest');
        if (response.ok) {
            const data: Review[] = await response.json();
            setReviews(data);
        }
    }
}

export default Grid;