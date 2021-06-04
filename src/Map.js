import { useEffect, useState, useReducer } from "react";
import { getToilet, patchToilet, postToilet } from "./services/toilet";
import "./Map.css";
import  ToiletForm  from "./ToiletForm";
import Mapbox from './Mapbox/Mapbox'


const MapComponent = () => {
  
 //toggle when add tolet is pressed, pass props from map
 const [showForm, setShowForm] = useState(false)
 
 

  return (
    <div>
      <h1>lalala</h1><br></br>
      <Mapbox/>
      <button onClick={() => setShowForm(!showForm)}>Toggle Toilet Form</button>
      <div>{showForm && <ToiletForm/>}
        
      </div>
    </div>
  );
};

export default MapComponent;
