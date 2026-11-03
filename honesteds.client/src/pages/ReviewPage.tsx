import Nav from "../components/Nav"
import Footer from "../components/Footer"
import type { Review } from '../interfaces/Review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function ReviewPage() {

    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const { id } = useParams<{ id: string }>();
        useEffect(() => {
            if (!id) return;
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        getReview(Number(id), controller.signal)
        .then(setReview)
        .catch(err => {
            if (err instanceof Error && err.name !== 'AbortError') setError(err);
        })
        .finally(() => {
            if (!controller.signal.aborted) setLoading(false);
        });

        return () => controller.abort();
    }, [id]);

    const CATEGORY_INFO: Record<string, { label: string; className: string }> = {
        restaurant: { label: 'Restaurant', className: 'restaurant' },
        golf: { label: 'Golf Course', className: 'golf' },
    };

    
    
    if(loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>;
    if (!review) return <p>Review not found.</p>;

    const info = CATEGORY_INFO[review.category];

    return (
        <>
            <Nav></Nav>
            
            <header className="review-header">
                <div><span className="category-badge ${info?.className ?? ''}">{info?.label ?? review.category}</span></div>
                <h1 className="review-title">{review.title}</h1>
            
                <div className="review-meta">
                <span className="stars" aria-label="Rated ${review.rating} out of 5">
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
                    <span className="rating-num">{review.rating.toFixed(1)}</span>
                </span>
                <span className="meta-sep"></span>
                <span>{review.location}</span>
                <span className="meta-sep"></span>
                <time >{review.dateCreated}</time>
                <span className="meta-sep"></span>
                </div>
            </header>
            
            <section className="review-hero">
                <figure>
                    <div className="hero-img" role="img" aria-label="The dining room at Maison Dorée"></div>
                    <figcaption>The main dining room at Maison Dorée, set for dinner service.</figcaption>
                </figure>
            </section>
            
            <article className="review-body">
                <p>{review.fullReview}</p>
            
                <div className="verdict">
                <div className="verdict-score">{review.rating}<small>out of 5</small></div>
                <div className="verdict-text">
                    <h3>The verdict</h3>
                    <p>{review.tagline}</p>
                </div>
                </div>
            </article>
        
            <Footer></Footer>
        </>
    );

    async function getReview( id : Number,
    signal?: AbortSignal){

        const response = await fetch('/api/review/' + id, {signal});
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
      
    }
}