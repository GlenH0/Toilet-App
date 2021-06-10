import { postToilet } from "./services/toilet";
import { useState} from "react";
import './Map.css'


//props should include lat lng from the map
const ToiletForm = (props) => {

    const useForm = (initialValues) => {
        const [values, setValues] = useState(initialValues);
    
        //handleChange function
        return [
          values,
          setValues,
          (e) => {
            console.log(values);
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            });
          },
        ];
      };
    
      const [formValues, setFormValues, handleChange] = useForm({
        name: "",
        lat: props.lat,
        lng: props.lng,
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
        postToilet(formValues).then((data) =>{ 
        alert('toilet successfully added')
        console.log(data);

      })};
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input name="name" type="text" value={formValues.name} onChange={handleChange}/>
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