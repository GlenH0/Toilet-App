import React,  { useRef, useEffect, useState } from "react";
import { postToilet } from "../services/toilet";
// import ReactDOM from "react-dom"
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Mapbox.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import FormPopup from './FormPopup'
import Marker from './Marker'
import TempMarker from './TempMarker'
// import useFetch from "../useFetch(s)/data";
import { getAllToilets } from "../services/toilet";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Mapbox = () => {
  //similar to use of this keyword, stores a reference, doesnt change
  //upon rerendering

  const map = useRef(null);
  const mapContainer = useRef(null);
  const tempMarker = useRef(null);
  const [lng, setLng] = useState(103.683632);
  const [lat, setLat] = useState(1.348065);
  const [formLatLng, setFormLatLng] = useState({});
  const [zoom, setZoom] = useState(15);
  const isTempRender = useRef(false)

  const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    
    return [
      values,
      setValues,
      //handleChange function
      (e) => {
        console.log('im called');
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
      },
    ];
  };

  const [formValues, setFormValues, handleChange] = useForm({
    name: "",
    rating: 0,
    location: "",
    hasBidet: false,
  });

  const handleCheckBox = (e) => {
    console.log(`name is ${e.target.name} value is ${e.target.checked}`);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = (e) => {
    //prevent page from reloading on form submission
    e.preventDefault();
    console.log(formValues);
    postToilet(formValues).then((data) => console.log(data));
  };

  //useeffect to intialise map
  useEffect(() => {
    //current ref is referred to as map.current
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxBounds : [
        [103.67934668325415 ,1.3390231935245396 ],
        [103.69015263599829, 1.3562527379503138] 
      ]
    });

    

    //runs once only 
    const fetchToiletData = async () => {
      const toiletData = await getAllToilets();
      toiletData.forEach((toilet) => {
        Marker(toilet,map.current,true)
      });
    };

    fetchToiletData();

    return () => map.current.remove()
  }, []);


  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("click", (e) => {
      //wipe current marker, create new marker on current place
      if (tempMarker.current) {
        tempMarker.current.remove();
      }
      //still dk for fuck here maybe can use to create new toilet
      tempMarker.current = TempMarker(e.lngLat,map.current,false)
      setFormLatLng(e.lngLat);
      console.log(tempMarker.current);
      //force popup to appear first
      tempMarker.current.togglePopup();

     /*  if (tempMarker) {
        tempMarker.remove();
      }
      //still dk for fuck here maybe can use to create new toilet
      setFormLatLng(e.lngLat);
      tempMarker = Marker(e.lngLat,map.current,false)
      
      console.log(tempMarker);
      //force popup to appear first
      tempMarker.togglePopup();
 */

      
    });
  },[]);

  
    
      //wipe current marker, create new marker on current place
      //still dk for fuck here maybe can use to create new toilet
     
      
    
    //everytime useEffect runs, its adding a new eventlistener
    
  return (
    <div className="mapbox-container">
      <div className="mapbox">
        <div ref={mapContainer} className="mapbox-container" />
      </div>
    </div>
  );
};

export default Mapbox;
