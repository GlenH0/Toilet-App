import React,  { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom"
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Mapbox.css";
import "mapbox-gl/dist/mapbox-gl.css";
import FormPopup from './FormPopup'
import Marker from './Marker'
import TempMarker from './TempMarker'
import useFetch from "../useFetch(s)/data";
import { getAllToilets } from "../services/toilet";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Mapbox = () => {
  //similar to use of this keyword, stores a reference, doesnt change
  //upon rerendering

  const map = useRef(null);
  const mapContainer = useRef(null);
  const tempMarker = useRef(null);
  let counter = useRef(0)
  //let tempMarker
  const [lng, setLng] = useState(103.683632);
  const [lat, setLat] = useState(1.348065);
  const [formLatLng, setFormLatLng] = useState({});
  const [zoom, setZoom] = useState(15);
  const isTempRender = useRef(false)

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

    map.current.on('load', (e) => {
      map.current.addSource('tempMarker', {
        type : 'geojson',
        data : {
          type : 'FeatureCollection',
          features : []
        }
      })

      map.current.addLayer({
        id : "tempMarker-layer",
        type : "symbol",
        source : "tempMarker",
        layout : {
          'icon-image' : 'toilet-15',
          'icon-padding': 0,
          'icon-allow-overlap': true,
          'icon-size' : 1.5
        }

      })

      map.current.on('click','tempMarker', e => {
        console.log(e);
      })
    })
    

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

  //for temp marker
  useEffect(() => {
    //runs only once on startup, wont run again for 
    if (!map.current) return; // wait for map to initialize
  
    //everytime useEffect runs, its adding a new eventlistener
    map.current.on("click", (e) => {
      console.log(e.lngLat.lng);

      map.current.getSource('tempMarker').setData({
        type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [e.lngLat.lng, e.lngLat.lat],
      },
      properties: {
        name: `Random Point`,
        description: `description for Random Point`,
      },
      })

     
  });
  },[]); //shouldnt be rerendering here.

  

  return (
    <div className="mapbox">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Mapbox;
