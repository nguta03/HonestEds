function Nav() {

    return (
        <>
            <footer>
                <div className="footer-top">
                    <div>
                    <div className="footer-logo"><span>Honest Ed's</span></div>
                    <p className="footer-tagline">Honest, considered reviews of Toronto's restaurants and golf courses.</p>
                    
                    <div className="social-links">
                        <a className="social-link" href="#" aria-label="Instagram">IG</a>
                        <a className="social-link" href="#" aria-label="X / Twitter">𝕏</a>
                        <a className="social-link" href="#" aria-label="Facebook">FB</a>
                        <a className="social-link" href="#" aria-label="YouTube">YT</a>
                    </div>
                    </div>
                
                    <div className="footer-col">
                        <h4>Explore</h4>
                        <a href="#">Home</a>
                        <a href="#">Restaurants</a>
                        <a href="#">Golf Courses</a>
                        <a href="#">Top Rated</a>
                        <a href="#">New This Month</a>
                    </div>
                
                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Our Reviewers</a>
                        <a href="#">Review Policy</a>
                        <a href="#">Contact</a>
                    </div>
                
                </div>
                
                <div className="footer-bottom">
                    <span>© 2026 The Reviewed. All rights reserved.</span>
                    <div className="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Cookie Settings</a>
                    </div>
                </div>
                </footer>
        </>
    );
}

export default Nav;