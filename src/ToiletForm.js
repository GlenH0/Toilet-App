import { getToilet, patchToilet, postToilet } from "./services/toilet";
import { useEffect, useState, useReducer } from "react";


//props should include lat lng from the map
const ToiletForm = (props) => {

    const useForm = (initialValues) => {
        const [values, setValues] = useState(initialValues);
    
        //handleChange function
        return [
          values,
          setValues,
          (e) => {
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            });
          },
        ];
      };
    
      const [formValues, setFormValues, handleChange] = useForm({
        name: "",
        lat: "",
        lng: "",
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
    
      const handleSubmit = (e) => {
        //prevent page from reloading on form submission
        e.preventDefault();
        console.log(formValues);
        postToilet(formValues).then((data) => console.log(data));
      };
    return (
        <div className="map">
            <div className="mapDetails">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input name="name" type="text" value={formValues.name} onChange={handleChange}/>
                    </label>
                    <label>
                        <p>Latitude</p>
                        <input name="lat" min='-120' max="120"  value={formValues.lat} onChange={handleChange}/>
                    </label>
                    <label>
                        <p>Longitude</p>
                        <input name="lng" min='-120' max="120" value={formValues.lng} onChange={handleChange}/>
                    </label>
                    <label>
                        <p>Has Bidet?</p>
                        <input name="hasBidet" type="checkbox" value={formValues.hasBidet} onChange={handleCheckBox}/>
                    </label>
                    <label>
                        <p>Rating</p>
                        <input name="rating" type="number" value={formValues.number} onChange={handleChange}/>
                    </label>
                    <label>
                        <p>Location</p>
                        <input name="location" value={formValues.location} onChange={handleChange}/>
                    </label><br></br>
                    <button type="submit">Update Toilet name</button>
                </form>
            </div>
        </div>
      );
}


export default ToiletForm