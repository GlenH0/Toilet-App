const Popup = (props) => {
  console.log(props);
    return (
        
            <div className="popup">
              <span>lat: {props.lat}, lng: {props.lng}</span>
            </div>
          
    )
}


export default Popup