import './InfoPopup.css'
import ReactStars from "react-rating-stars-component";
import { FaMapMarkerAlt } from "react-icons/fa";

const InfoPopup = (props) => {
    

    return (
        <div className="InfoPopup">
            <h2>{props.name}</h2>
            <a href={"/toiletdetails/" + props._id}>
            <div className='InfoPopup-imageContainer'>
             <img className="InfoPopup-image" src={props.image_url}></img>
            </div>
            </a>
            
            <p><FaMapMarkerAlt style={{color:'#1184e8'}}/> {props.location}</p>
            {/* <p>{props.rating} stars</p> */}
            <ReactStars
                count={5}
                edit={false}
                value={props.rating}
                isHalf={true}
                size={18}
                activeColor="#ffb260"
                classNames='detailsInfo-rating'
              />
        </div>
    )
}

export default InfoPopup