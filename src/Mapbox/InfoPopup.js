import './InfoPopup.css'

const InfoPopup = (props) => {
    let toilet_url = "/toiletdetails/" + props._id
    return (
        <div className="InfoPopup">
            <h1>{props.name}</h1>
            <p>{props.location}</p>
            <a href={toilet_url}>
            <img className="InfoPopup-image" src={props.image_url}></img>
            </a>
        </div>
    )
}

export default InfoPopup