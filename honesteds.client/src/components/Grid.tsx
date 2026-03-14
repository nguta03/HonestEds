
// <card></card>
// <card></card>
// <card></card>
//<pagination></pagination>

function Grid() {
    return (
        <>
            <section className="reviews-section">
                <p className="section-label">Latest Reviews</p>
                <div className="reviews-grid">
                
                    <article className="review-card">
                    <div className="card-img-wrap">
                        <div className="img-placeholder-2">⛳</div>
                        <span className="card-category">Golf Course</span>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Ridgecrest Golf & Country Club</h2>
                        <div className="card-stars">
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star empty">★</span>
                        <span className="card-rating-text">4.0 / 5</span>
                        </div>
                        <p className="card-excerpt">Impeccably maintained fairways and a back nine that punishes overconfidence — this is a course that rewards patience and local knowledge above all else.</p>
                        <div className="card-footer">
                        <span className="card-author">By Sandra Okafor</span>
                        <span className="card-date">Mar 8, 2026</span>
                        </div>
                    </div>
                    </article>
                
                    <article className="review-card">
                    <div className="card-img-wrap">
                        <div className="img-placeholder-3">🍣</div>
                        <span className="card-category">Restaurant</span>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Nori & Co. Omakase Bar</h2>
                        <div className="card-stars">
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star empty">★</span>
                        <span className="star empty">★</span>
                        <span className="card-rating-text">3.0 / 5</span>
                        </div>
                        <p className="card-excerpt">The fish quality is exceptional and the chef's vision is clear — but at this price point the inconsistency in pacing and a poorly matched sake list hold it back.</p>
                        <div className="card-footer">
                        <span className="card-author">By James Tran</span>
                        <span className="card-date">Mar 5, 2026</span>
                        </div>
                    </div>
                    </article>
                
                    <article className="review-card">
                    <div className="card-img-wrap">
                        <div className="img-placeholder-4">⛳</div>
                        <span className="card-category">Golf Course</span>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Lakeview Links at Halton Hills</h2>
                        <div className="card-stars">
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star empty">★</span>
                        <span className="card-rating-text">4.0 / 5</span>
                        </div>
                        <p className="card-excerpt">Sweeping views of the escarpment, a generous clubhouse, and a layout that manages to be both scenic and genuinely challenging — a strong pick for weekend groups.</p>
                        <div className="card-footer">
                        <span className="card-author">By Priya Menon</span>
                        <span className="card-date">Feb 28, 2026</span>
                        </div>
                    </div>
                    </article>
                
                </div>
                </section>
                
                <div className="pagination-section">
                <button className="pag-btn" aria-label="Previous">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <button className="pag-btn active">1</button>
                <button className="pag-btn">2</button>
                <button className="pag-btn">3</button>
                <span className="pag-dots">…</span>
                <button className="pag-btn">12</button>
                <button className="pag-btn" aria-label="Next">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
                </div>
        </>
    );
}

export default Grid;