import {Link} from 'react-router-dom'

const NavBar = () => {
    return ( 
        <div className="navBar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/map">Map</Link>
            </div>
        </div>
     );
}
 
export default NavBar;