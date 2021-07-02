import {NavLink} from 'react-router-dom'
import './NavBar.css';

const NavBar = () => {
    return ( 
        <div className="navBar">
            <div className="links">
                <NavLink exact activeclass='active' className='links-btn' to="/"  >Home</NavLink>
                <NavLink activeclass='active' className='links-btn'  to="/map" >Map</NavLink>
            </div>
        </div>
     );
}
 
export default NavBar;