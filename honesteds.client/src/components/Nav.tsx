import { NavLink } from 'react-router-dom';

function Nav() {

    return (
        <>
            <nav className="">
                <NavLink className="nav-logo" to="/"><span>Honest Ed's</span></NavLink>
                <div className="nav-links">
                    <NavLink to="/" className="active">Home</NavLink>
                    <NavLink to="/restaurants">Restaurants</NavLink>
                    <NavLink to="/golf-courses">Golf Courses</NavLink>
                </div>
                <button className="nav-search" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                </button>
            </nav>
        </>
    );
}

export default Nav;