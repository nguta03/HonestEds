function Nav() {

    return (
        <>
            <footer>
                <div className="footer-top">
                    <div>
                    <div className="footer-logo"><span>Honest Ed's</span></div>
                    </div>
                
                    <div className="footer-col">
                        <h4>Explore</h4>
                        <a href="/">Home</a>
                        <a href="/reviews?category=restaurant">Restaurants</a>
                        <a href="/reviews?category=golf">Golf Courses</a>
                        <a href="#">Top Rated</a>
                    </div>
                
                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Review Policy</a>
                        <a href="#">Contact</a>
                    </div>
                
                </div>
                </footer>
        </>
    );
}

export default Nav;