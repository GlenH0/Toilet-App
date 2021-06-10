// import { useState } from "react";
// import { getToilet, patchToilet, postToilet } from "./services/toilet";
import "./Map.css";
// import  ToiletForm  from "./ToiletForm";
import Mapbox from './Mapbox/Mapbox'


const MapComponent = () => {
  
 //toggle when add tolet is pressed, pass props from map
//  const [showForm, setShowForm] = useState(false)
 
 

  return (
    <div className="map-container">
      <img src="blur_background.png" alt="" />
      <Mapbox/>
    </div>
  );
};

export default MapComponent;
