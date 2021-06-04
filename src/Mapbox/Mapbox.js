import React,  { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom"
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Mapbox.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Popup from './Popup'
import useFetch from "../useFetch(s)/data";
import { getAllToilets } from "../services/toilet";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Mapbox = () => {
  //similar to use of this keyword, stores a reference, doesnt change
  //upon rerendering

  const map = useRef(null);
  const mapContainer = useRef(null);
  let tempMarker;
  const [lng, setLng] = useState(103.683632);
  const [lat, setLat] = useState(1.348065);
  const [formLatLng, setFormLatLng] = useState({});
  const [zoom, setZoom] = useState(15);


  useEffect(() => {
    //current ref is referred to as map.current
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const fetchToiletData = async () => {
      const toiletData = await getAllToilets();
      toiletData.forEach((toilet) => {
        new mapboxgl.Marker()
          .setLngLat([toilet.lng, toilet.lat])
          .addTo(map.current);
      });
    };

    fetchToiletData();
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("click", function (e) {
      //wipe current marker, create new marker on current place
      if (tempMarker) {
        tempMarker.remove();
      }

      //still dk for fuck here maybe can use to create new toilet
      setFormLatLng(e.lngLat);

      //now wan use imported JSX must like this bobian
      let popupDiv = document.createElement('div')
      ReactDOM.render(<Popup lat={e.lngLat.lat} lng={e.lngLat.lng}/>,popupDiv)
      
      let popup = new mapboxgl.Popup({ offset: 25 });
      popup.setDOMContent(popupDiv)

      tempMarker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setPopup(popup)
        .addTo(map.current);
      
        //force popup to appear first
      tempMarker.togglePopup();
      
    });
  },[]);

  return (
    <div className="mapbox">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Mapbox;
