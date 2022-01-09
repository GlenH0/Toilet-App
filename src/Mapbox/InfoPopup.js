import "./InfoPopup.css";
import Rating from "@material-ui/lab/Rating"
import { BrowserRouter, Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const InfoPopup = (props) => {
  return (
    <div className="InfoPopup">
      <h2>{props.name}</h2>
      {/* previous solution */}
      {/* <a href={"/toiletdetails/" + props._id}>
            <div className='InfoPopup-imageContainer'>
             <img className="InfoPopup-image" src={props.image_url}></img>
            </div>
            </a> */}

      <BrowserRouter>
        <Link
          onClick={() => {
            window.location.href = `/toiletdetails/${props._id}`;
          }}
        >
          <div className="InfoPopup-imageContainer">
            <img className="InfoPopup-image" src={props.image_url}></img>
          </div>
        </Link>
      </BrowserRouter>

      <p>
        <FaMapMarkerAlt style={{ color: "#1184e8" }} /> {props.location}
      </p>
      {/* <p>{props.rating} stars</p> */}
      <Rating
        value={props.rating}
        readOnly
      />
    </div>
  );
};

export default InfoPopup;
