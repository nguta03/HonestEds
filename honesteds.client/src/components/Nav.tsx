
function Nav() {

    return (
        <>
            <nav className="">
                <a className="nav-logo" href="#"><span>Honest Ed's</span></a>
                <div className="nav-links">
                    <a href="#" className="active">Home</a>
                    <a href="#">Restaurants</a>
                    <a href="#">Golf Courses</a>
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