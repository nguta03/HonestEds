import Nav from "../components/Nav"
import Footer from "../components/Footer"
import type { Review } from '../interfaces/Review';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
export interface ReviewFilters {
  category?: 'restaurant' | 'golf' | null;
  location?: string | null;
  minRating?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}
type SortKey = 'rating' | 'location' | 'date';

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
  
  const SORT_FIELDS: Record<SortKey, (r: Review) => string | number> = {
    rating: r => r.rating,
    location: r => r.location,
    date: r => new Date(r.dateCreated).getTime(),
  };
  const [sortKey, sortDir] = (searchParams.get('sortBy') ?? 'date descending').split(' ');
  const sort: SortKey = sortKey in SORT_FIELDS ? (sortKey as SortKey) : 'date';
  const dir = sortDir === 'ascending' ? 'ascending' : 'descending';

  //table heading sorting

  const COLUMNS: { key: SortKey; label: string }[] = [
    { key: 'rating', label: 'Rating' },
    { key: 'location', label: 'Location' },
    { key: 'date', label: 'Date' },
  ];
  
  function toggleSort(key: SortKey) {
    const next = new URLSearchParams(searchParams);
    if (key === sort) {
      next.set('sortBy', key + " " + (dir === 'ascending' ? 'descending' : 'ascending'));
    } else{
      if (key === 'location'){
        next.set('sortBy', key + " " + 'ascending');
      }else{
        next.set('sortBy', key + " " + 'descending');
      }
    }
    setCurrentPage(1);
    setSearchParams(next);
  }

  const sortedReviews = useMemo(() => {
    const get = SORT_FIELDS[sort];
    const factor = dir === 'ascending' ? 1 : -1;

    return [...reviews].sort((a, b) => {
      const x = get(a);
      const y = get(b);
      const result =
        typeof x === 'number' && typeof y === 'number'
          ? x - y
          : String(x).localeCompare(String(y));
      return result * factor;
    });
  }, [reviews, sort, dir]);

  //pagination
  const reviewsPerPage = 50
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const currentReviews = sortedReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    
    getReviews({ category, location, minRating, dateFrom, dateTo }, controller.signal)
      .then(setReviews)
      .catch(err => {
        if (err instanceof Error && err.name !== 'AbortError') setError(err);})
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });

    return () => controller.abort();
  }, [category, location, minRating, dateFrom, dateTo]);
    
  let content;
  if (error) {
    content = <p className="table-message error">Error: {error.message}</p>;
  } else if (loading) {
    content = <p className="table-message">Loading…</p>;
  } else if (sortedReviews.length === 0) {
    content = <p className="table-message">No reviews match these filters.</p>;
  } else {
    content = (
      <>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name <span className="sort-icon"></span></th>
                <th>Category <span className="sort-icon"></span></th>
                {COLUMNS.map(col => {
                  const active = col.key === sort;
                  return (
                    <th
                      key={col.key}
                      className={active ? 'sorted' : ''}
                      onClick={() => toggleSort(col.key)}
                      aria-sort={active ? (dir === 'ascending' ? 'ascending' : 'descending') : 'none'}
                    >
                      {col.label}{' '}
                      <span className="sort-icon">
                        {active ? (dir === 'ascending' ? '↑' : '↓') : '↕'}
                      </span>
                    </th>
                  );
                })}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map(review => (
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
                  <td className="td-action"><a href={"/reviews/" + review.id} className="read-link">Read →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                <path d="M15 18l-5-5 5-5" />
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
                <path d="M9 18l5-5-5-5" />
              </svg>
          </button>
        </div>
      </>
    );
  }


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
        <p className="results-count">Showing <strong>{currentReviews.length}</strong> of {reviews.length} reviews</p>
      </div>
      {content}

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