import './InfoPopup.css'

const InfoPopup = (props) => {
    

    return (
        <div className="InfoPopup">
            <h1>{props.name}</h1>
            <p>{props.location}</p>
            <p>{props.rating} stars</p>
            <a href={"/toiletdetails/" + props._id}>
            <img className="InfoPopup-image" src={props.image_url}></img>
            </a>
        </div>
    )
}

export default InfoPopup