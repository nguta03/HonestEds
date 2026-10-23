import Nav from "../components/Nav"
import Footer from "../components/Footer"
import type { Review } from '../interfaces/Review';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export interface ReviewFilters {
  category?: 'restaurant' | 'golf' | null;
  location?: string | null;
  minRating?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function clearParams(){ //Keep sort order
    const next = new URLSearchParams(searchParams);
    ['category', 'location', 'minRating', 'from', 'to'].forEach(k => next.delete(k));
    setSearchParams(next);

  }

  //chips
  const FILTER_LABELS: Record<string, (v: string) => string> = {
    category: v => (v === 'golf' ? 'Golf Course' : 'Restaurant'),
    location: v => v,
    minRating: v => `${v}★ & above`,
    dateFrom: v => `From ${v}`,
    dateTo: v => `To ${v}`,
  };

  const chips: { key: string; label: string }[] = [];
  for (const [key, format] of Object.entries(FILTER_LABELS)) {
    const value = searchParams.get(key);
    if (value) chips.push({ key, label: format(value) });
  }

  const category = searchParams.get('category') as 'restaurant' | 'golf' | null;
  const location = searchParams.get('location') ?? '';
  const minRating = searchParams.get('minRating') ?? '';
  const dateFrom = searchParams.get('dateFrom') ?? '';
  const dateTo = searchParams.get('dateTo') ?? '';
  const sortBy = searchParams.get('sortBy') as 'Newest First' | 'Oldest First' | 'Highest Rated' | 'Lowest Rated' | 'Alphabetical';
  const [error, setError] = useState<Error | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const controller = new AbortController();
      setLoading(true);
      setError(null);
      updateParam('sortBy', 'Newest First')
      getReviews({ category, location, minRating, dateFrom, dateTo }, controller.signal)
        .then(setReviews)
        .catch(err => {
          if (err instanceof Error && err.name !== 'AbortError') setError(err);})
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });

      return () => controller.abort();
      }, [category, location, minRating, dateFrom, dateTo]);
    
  if(loading) return <p>Loading...</p>
  if (!reviews) return (null);
    return (
    <>
        <Nav></Nav>
        <div className="page-header">
          <h1>All Reviews</h1>
        </div>
        <div className="filters-bar">
        <div className="filter-group">
          <label>Category</label>
          <select value={category ?? ''}
          onChange={(e) => updateParam('category', e.target.value)}>
            <option value="">All Categories</option>
            <option value="restaurant">Restaurant</option>
            <option value="golf">Golf Course</option>
          </select>
        </div>
      
        <div className="filter-group">
          <label>Location</label>
          <select value={location}
          onChange={e => updateParam('location', e.target.value)}>
            <option value="">All Locations</option>
            <option value="Toronto, ON">Toronto, ON</option>
            <option value="Mississauga, ON">Mississauga, ON</option>
            <option value="Halton Hills, ON">Halton Hills, ON</option>
            <option value="Oakville, ON">Oakville, ON</option>
          </select>
        </div>
      
        <div className="filter-group">
          <label>Rating</label>
          <select value={minRating}
          onChange={e => updateParam('minRating', e.target.value)}>
            <option value="">Any Rating</option>
            <option value="5">★★★★★ 5 only</option>
            <option value="4">★★★★ 4 &amp; above</option>
            <option value="3">★★★ 3 &amp; above</option>
            <option value="2">★★ 2 &amp; above</option>
          </select>
        </div>
      
        <div className="filter-group">
          <label>Date Range</label>
          <div className="filter-date-range">
            <input type="date" value={dateFrom} onChange={e => updateParam('dateFrom', e.target.value)}/>
            <span>to</span>
            <input type="date" value={dateTo} onChange={e => updateParam('dateTo', e.target.value)}/>
          </div>
        </div>
      
        <div className="filter-actions">
          <button className="btn-clear" onClick={clearParams}>Clear Filters</button>
        </div>
      </div>
      
      {chips.length > 0 && (
        <div className="filter-chips">
          {chips.map(chip => (
            <div className="chip" key={chip.key}>
              {chip.label}
              <button
                aria-label={`Remove ${chip.label} filter`}
                onClick={() => updateParam(chip.key, '')}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="results-bar">
        <p className="results-count">Showing <strong>12</strong> of {reviews.length} reviews</p>
      </div>

      
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name <span className="sort-icon">↕</span></th>
              <th>Category <span className="sort-icon">↕</span></th>
              <th className="sorted">Rating <span className="sort-icon">↓</span></th>
              <th>Location <span className="sort-icon">↕</span></th>
              <th>Date <span className="sort-icon">↕</span></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id}>
                <td className="td-title">{review.title}</td>
                <td className="td-category"><span className="category-badge restaurant">{review.category}</span></td>
                <td className="td-stars">
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
                </td>
                <td className="td-location">{review.location}</td>
                <td className="td-date">{review.dateCreated}</td>
                <td className="td-action"><a href="#" className="read-link">Read →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* add pagination similar to grid */}
      
      <Footer></Footer>
    </>
  );

  async function getReviews(
    filters: ReviewFilters = {},
    signal?: AbortSignal): Promise<Review[]> {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.location) params.set('location', filters.location);
      if (filters.minRating) params.set('minRating', filters.minRating);
      if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.set('dateTo', filters.dateTo);

      const response = await fetch('/api/review/reviews?' + params.toString(), {signal});

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return await response.json();
      
      
  }
}