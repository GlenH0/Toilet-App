// import { useState } from "react";
// import { getToilet, patchToilet, postToilet } from "./services/toilet";
import "./Map.css";
// import  ToiletForm  from "./ToiletForm";
import Mapbox from './Mapbox/Mapbox'

import { FaSistrix } from "react-icons/fa";


const MapComponent = () => {
  
 //toggle when add tolet is pressed, pass props from map
//  const [showForm, setShowForm] = useState(false)
 
 

  return (
    <div className="map-container">
      <div className="map-container-title">
        <h2><span className='map-container-icon'>F<FaSistrix size={82} color={'#ffb260'}/>nd</span></h2>
        <h2>Your  <br/> Toilet</h2>
      </div>
      <Mapbox/>
    </div>
  );
};

export default MapComponent;
