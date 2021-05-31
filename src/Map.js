import { useEffect, useState, useReducer } from "react";
import { getToilet, patchToilet, postToilet } from "./services/toilet";
import "./Map.css";
import  ToiletForm  from "./ToiletForm";

const Map = () => {
  //testing for editing one toilet only

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

  console.log(typeof handleChange);

  const handleCheckBox = (e) => {
    console.log(`name is ${e.target.name} value is ${e.target.checked}`);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    postToilet(formValues).then((data) => console.log(data));
  };

  return (
    <div>
      <h1>lalala</h1>
      <div>
        <ToiletForm
          formValues={formValues}
          handleChange={handleChange}
          handleCheckBox={handleCheckBox}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Map;
