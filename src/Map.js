import { useEffect, useState, useReducer } from "react";
import { getToilet,patchToilet, postToilet } from "./services/toilet";
import './Map.css'

const Map = () => {
  //testing for editing one toilet only

  //reducer used to update object (has subvalues)
  const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues)

    //handleChange function
    return [values , setValues, (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }]
  }
  
  const [formValues, setFormValues, handleChange] = useForm({
      name : "",
      lat : "",
      lng : "",
      rating : 0,
      location : "",
      hasBidet : false
  })

  const handleCheckBox = (e) => {
      console.log(`name is ${e.target.name} value is ${e.target.checked}`);
      setFormValues({
        ...formValues,  
        [e.target.name] : e.target.checked
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postToilet(formValues).then(data => alert(data));
  };
  
  return (
    <div className="map">
        <div>
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
};

export default Map;
