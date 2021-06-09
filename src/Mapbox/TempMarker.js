import mapboxgl from "mapbox-gl"
import ReactDOM from "react-dom"
import FormPopup from "./FormPopup"

const TempMarker = (data,map) => {
    //create marker
    let marker = new mapboxgl.Marker()
        .setLngLat([data.lng,data.lat])
        .addTo(map)
        

    //add formpopup 
    let popupDiv = document.createElement('div')
        ReactDOM.render(<FormPopup lat={data.lat} lng={data.lng}/>,popupDiv)

        let popup = new mapboxgl.Popup({})
        popup.setDOMContent(popupDiv)
        marker.setPopup(popup)
       
    
    return marker
}


export default TempMarker