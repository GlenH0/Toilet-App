import { Link } from "react-router-dom"
import './Reroute.css'
import { FaHandPointRight } from "react-icons/fa";

const NotFound = () => {
    return ( 
        <div className="notfound">
            <img className="notfound-img" src="https://blog.hubspot.com/hubfs/404-error-page-examples.jpeg" alt="Not Found" />
            <p></p>
            <Link className="notfound-link" to ="/"><FaHandPointRight size={30}/> Back to the homepage...?</Link>
        </div>
     );
}
 
export default NotFound;