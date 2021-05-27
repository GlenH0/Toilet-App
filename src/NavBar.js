import {Link} from 'react-router-dom'

const NavBar = () => {
    return ( 
        <div className="navBar">
            <div className="links">
                <Link to="/" className="links-btn" style={{color: 'black'}}>Home</Link>
                <Link to="/map" className="links-btn"  style={{color: 'black'}}>Map</Link>
            </div>
        </div>
     );
}
 
export default NavBar;