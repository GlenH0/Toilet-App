import {NavLink} from 'react-router-dom'
import './NavBar.css';
import { FaHome, FaMapMarkedAlt } from "react-icons/fa";
import logo from './logo.png'

const NavBar = () => {
    return ( 
        <div className="navBar">
            <div className="links">
                <img src={logo} alt="" className="links-logo"/>

                <NavLink exact activeclass='active' className='links-btn' to="/"  ><FaHome size={34}/></NavLink>
                
                <NavLink activeclass='active' className='links-btn'  to="/map" ><FaMapMarkedAlt size={34}/></NavLink>
            </div>
        </div>
     );
}
 
export default NavBar;