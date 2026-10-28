import { NavLink } from 'react-router-dom';

function Nav() {

    return (
        <>
            <nav className="">
                <NavLink className="nav-logo" to="/"><span>Honest Ed's</span></NavLink>
                <div className="nav-links">
                    <NavLink to="/" className="active">Home</NavLink>
                    <NavLink to="/reviews">Reviews</NavLink>
                </div>
                
            </nav>
        </>
    );
}

export default Nav;