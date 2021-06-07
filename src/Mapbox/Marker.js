import mapboxgl from "mapbox-gl"
import FormPopup from './FormPopup'
import ReactDOM from "react-dom"
import InfoPopup from "./InfoPopup"

const Marker = (data,map,isRealMarker) => {
    let marker = new mapboxgl.Marker()
        .setLngLat([data.lng,data.lat])
        .addTo(map)
    
    if (isRealMarker){

        //the whole setDOM shit 
        //now wan use imported JSX must like this bobian
        let popupDiv = document.createElement('div')
        ReactDOM.render(<InfoPopup 
                            name={data.name} 
                            location={data.location}
                            image_url = {data.image_url}
                            _id = {data._id}
                            />,popupDiv)

        let popup = new mapboxgl.Popup({})
        popup.setDOMContent(popupDiv)

        marker.setPopup(popup)
        marker.on('click',function (e) {
            e.stopPropagation();
            marker.togglePopup()
            
        })
    }

    else {
        let popupDiv = document.createElement('div')
        ReactDOM.render(<FormPopup lat={data.lat} lng={data.lng}/>,popupDiv)

        let popup = new mapboxgl.Popup({})
        popup.setDOMContent(popupDiv)

        marker.setPopup(popup)
       
        marker.on('click',function (e) {
            e.stopPropagation();
            marker.togglePopup()
            
        })
    }

    return marker
    
}
  
  
  export default Marker