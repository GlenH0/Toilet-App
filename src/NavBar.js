import {Link} from 'react-router-dom'
import './NavBar.css';

const NavBar = () => {
    return ( 
        <div className="navBar">
            <div className="links">
                <Link to="/" className="links-btn" >Home</Link>
                <Link to="/map" className="links-btn">Map</Link>
            </div>
        </div>
     );
}
 
export default NavBar;