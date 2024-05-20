import {Form,redirect} from "react-router-dom";
import logo from '../logo.svg';
import '../App.css';
import localforage from "localforage";
import {unitconv} from "../math.js";
import {useState} from "react";

async function Diet_Form_Callback({ request, params }) {
  const formData = await request.formData();
  const formDataObj = {};
  formData.forEach((value, key) => formDataObj[key] = value);
  formDataObj.amountAF =unitconv(formDataObj.amountAF,formDataObj.unit)
  localforage.setItem("diet", formDataObj)
  return redirect(`/Results`);
}

export default function DietInfo() {
      
  const [inputFields, setInputFields] = useState([]);

  //creates the array from changes in the select drop down menue
  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedName = selectedOption.getAttribute("name");
    const newInputFields = [...inputFields, { value: selectedValue, name: selectedName }];
    setInputFields(newInputFields);
  };

  //allows users to delete the added rows
  const handleDeleteInput = (index,event) => {
    event.preventDefault(); // Prevent form submission 
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };


  return (
    <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
      <div className="first-header">
        Diet Info: Daily Intake
      </div>
      * indicates mandatory information

      <Form method="post" id="dietinfo">
        <ul className="flex-outer">
          <li>
            <label htmlFor="amountAF">Daily Intake of Food:  </label>
            <input required 
              id= "amountAF"
              aria-label="Daily Amount of Food"
              type="number"
              name="amountAF"              
              min="0"
              defaultValue={300}
            />
          </li>
        {/* --------------------------------- */}
          <li>
            <p>Units:</p>
              <ul className="flex-inner">
                <li>
                  <input type="radio" name="unit" id="g" value="g" defaultChecked={true}/>
                  <label htmlFor="g"> g </label> 
                </li>
                <li>
                  <input type="radio" name="unit" id="oz" value="oz"/>
                  <label htmlFor="oz"> oz </label>
                </li>
              </ul>
          </li>
        </ul>
      {/* --------------------------------- */}
      <div className="first-header">
        Diet Info: Pet Food Info
      </div>
      {/* --------------------------------- */}
        <ul className="flex-outer">
          <li>
            <label htmlFor="kcal">Calorie (kcal/kg)* </label>
              <input required 
                id="kcal"
                aria-label="The caloric density of the food"
                type="number"
                name="kcal"
                min="0"
                defaultValue={3500}
              />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="moisture">Max Moisture (%)* </label>
            <input required 
              id="moisture"
              aria-label="Maximum amount of moisture"
              type="number"
              name="moisture"
              min="0"
              max="99"
              defaultValue={10}
            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="cp">Crude Protein (%)* </label>
            <input required 
              id="cp"
              aria-label="Minimum amount of crude protein"
              type="number"
              name="cp"
              min="0"
              max="99"
              defaultValue={18}
            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="tfat">Crude Fat (%)* </label>
            <input required 
              id="tfat"
              aria-label="Mnimum amount of crude fat"
              type="number"
              name="tfat"
              min="0"
              max="99"
              defaultValue={10}
            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="fibre">Crude Fibre (%)* </label>
            <input required
              id="fibre" 
              aria-label="Minimum amount of crude fibre"
              type="number"
              name="fibre"
              min="0"
              max="99"
              defaultValue={15}
            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="fibre">Calcium (%) </label>
            <input 
              id="Ca" 
              aria-label="Minimum amount of calcium"
              type="number"
              name="Ca"
              min="0"
              max="99"
              step="0.1"
            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="fibre">Phosphorus (%) </label>
            <input 
              id="P" 
              aria-label="Minimum amount of phosphorous"
              type="number"
              name="P"
              min="0"
              max="99"
              step="0.1"
            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="fibre">Selenium (mg/kg) </label>
            <input 
              id="Se" 
              aria-label="Selenium Concentration"
              type="number"
              name="Se"
              min="0"
              max="2"
              step="0.1"

            />
          </li>
      {/* --------------------------------- */}
          <li>
            <label htmlFor="fibre">Vitamin E (IU/kg) </label>
            <input 
              id="vitE" 
              aria-label="Vitamin E Concentration"
              type="number"
              name="vitE"
              min="0"
              max="1000"
            />
          </li>
        </ul>
        <br></br>
        Select any additional nutrient included on your guaranteed analysis using the drop down menu. 
        <br></br>
        <br></br>

        <select className="selectBox" onChange={handleSelectChange}>
          <option selected="true" disabled="disabled">Select Additional Nutrients</option>
          <option value="Copper (mg/kg) " name= "Cu"> Copper </option>
          <option value="DHA + EPA (%) " name= "epa_dha">DHA + EPA </option>
          <option value="Glucosamine (ppm) " name= "glucosamine"> Glucosamine </option>
          <option value="Iodine (mg/kg) " name= "I"> Iodine</option>
          <option value="Linoleic Acid (%)" name= "LA"> Linoleic Acid </option>
          <option value="Lysine (%) " name= "Lys"> Lysine </option>
          <option value="Manganese (mg/kg) " name= "Mn"> Manganese </option>
          <option value="Magnesium (%) " name= "Mg"> Magnesium </option>
          <option value="Methionine (%) " name= "Met"> Methionine </option>
          <option value="Omega-3 FA (%) "name="ala">Omega-3 Fatty Acid</option>
          <option value="Omega-6 FA (%) " >Omega-6 Fatty Acid</option>
          <option value="Sodium (%) " name= "Na"> Sodium </option>          
          <option value="Vitamin A (IU/kg) " name="vitA">Vitamin A</option>
          <option value="Vitamin D (IU/kg) " name="vitD">Vitamin D</option>
          <option value="Zinc (mg/kg) " name= "Zn"> Zinc </option>
        </select>

        <br></br>

        
        <ul className="flex-outer">
          {inputFields.map((option, index) => ( //renders the mapped dynamic input fields
            <li key={index}>
              <label>{option.value}</label>
              <input type="text" name={option.name} /> {/* Assign unique name so it can be entered into dataobkect*/}
              <button onClick={(e) => handleDeleteInput(index,e)}>X</button>
            </li>
          ))}
        </ul>

      <ul className="flex-outer">
        <li>
          <button type="submit">Submit</button>  
        </li> 
        <br></br>
      </ul> 

        <p className ="flex-outer"> Notes:</p>
        <ul className ="flex-outer">
          <li className="simple-list">- PPM is the same as mg/kg. These units are interchangeable</li>
          <li className="simple-list">- Please reach out to the pet food manufacturer if you'd like a more complete nutritional profile on your pet</li>
        </ul>

   

    </Form>
  </div>
  
);
}

export {Diet_Form_Callback, DietInfo};
