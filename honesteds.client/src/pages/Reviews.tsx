import Nav from "../components/Nav"
import Footer from "../components/Footer"
import type { Review } from '../interfaces/Review';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchParams] = useSearchParams();

  //
  const [category, setCategory] = useState<'restaurant' | 'golf' | null>(
    searchParams.get('category') as 'restaurant' | 'golf' | null ?? null
  );


  const [loading, setLoading] = useState(true);
  useEffect(() => {
      getReviews().finally(() => setLoading(false));
      }, []);
    
  if(loading) return <p>Loading...</p>
  if (!reviews) return null;
    return (
    <>
        <Nav></Nav>
        <div className="page-header">
          <h1>All Reviews</h1>
        </div>
        <div className="filters-bar">
        <div className="filter-group">
          <label>Category</label>
          <select>
            <option value="">All Categories</option>
            <option value="restaurant">Restaurant</option>
            <option value="golf">Golf Course</option>
          </select>
        </div>
      
        <div className="filter-group">
          <label>Location</label>
          <select>
            <option value="">All Locations</option>
            <option value="toronto">Toronto, ON</option>
            <option value="mississauga">Mississauga, ON</option>
            <option value="halton">Halton Hills, ON</option>
            <option value="oakville">Oakville, ON</option>
          </select>
        </div>
      
        <div className="filter-group">
          <label>Rating</label>
          <select>
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
            <input type="date" value="2026-01-01" />
            <span>to</span>
            <input type="date" value="2026-12-31" />
          </div>
        </div>
      
        <div className="filter-actions">
          <button className="btn-clear">Clear</button>
          <button className="btn-apply">Apply Filters</button>
        </div>
      </div>
      
      <div className="filter-chips">
        <div className="chip">Restaurant <button>✕</button></div>
        <div className="chip">Toronto, ON <button>✕</button></div>
        <div className="chip">4★ &amp; above <button>✕</button></div>
      </div>
      
      <div className="results-bar">
        <p className="results-count">Showing <strong>12</strong> of 24 reviews</p>
        <div className="sort-wrap">
          <label>Sort by</label>
          <select>
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
            <option>A → Z</option>
          </select>
        </div>
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
              <tr>
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

  async function getReviews() {
      const response = await fetch('/api/review/reviews');
      if (response.ok) {
          const data: Review[] = await response.json();
          setReviews(data);
      }
  }
}