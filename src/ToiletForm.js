const ToiletForm = (props) => {
    return (
        <div className="map">
            <div className="mapDetails">
                <form onSubmit={props.handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input name="name" type="text" value={props.formValues.name} onChange={props.handleChange}/>
                    </label>
                    <label>
                        <p>Latitude</p>
                        <input name="lat" min='-120' max="120"  value={props.formValues.lat} onChange={props.handleChange}/>
                    </label>
                    <label>
                        <p>Longitude</p>
                        <input name="lng" min='-120' max="120" value={props.formValues.lng} onChange={props.handleChange}/>
                    </label>
                    <label>
                        <p>Has Bidet?</p>
                        <input name="hasBidet" type="checkbox" value={props.formValues.hasBidet} onChange={props.handleCheckBox}/>
                    </label>
                    <label>
                        <p>Rating</p>
                        <input name="rating" type="number" value={props.formValues.number} onChange={props.handleChange}/>
                    </label>
                    <label>
                        <p>Location</p>
                        <input name="location" value={props.formValues.location} onChange={props.handleChange}/>
                    </label><br></br>
                    <button type="submit">Update Toilet name</button>
                </form>
            </div>
        </div>
      );
}


export default ToiletForm