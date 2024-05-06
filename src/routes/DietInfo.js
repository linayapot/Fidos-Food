import {Form,redirect} from "react-router-dom";
import logo from '../logo.svg';
import '../App.css';
import localforage from "localforage";
import {unitconv, units} from "../math.js";
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

  //creates the rows to be generated after a change occurs in the drop down box
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    const newInputFields = [...inputFields, selectedOption];
    setInputFields(newInputFields);
  };

  //allows users to delete the added rows
  const handleDeleteInput = (index) => {
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
        <ul class="flex-outer">
          <li>
            <label for="amountAF">Daily Intake of Food:  </label>
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
              <ul class="flex-inner">
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
        <ul class="flex-outer">
          <li>
            <label for="kcal">Calorie* (kcal/kg): </label>
              <input required 
                id="kcal"
                aria-label="The caloric density of the food"
                type="number"
                name="kcal"
                min="0"
                defaultValue={3500}
              />
          </li>
          <li>
            <label for="moisture">Max Moisture* (%):  </label>
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
          <li>
            <label for="cp">Min Crude Protein* (%):  </label>
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
          <li>
            <label for="tfat">Min  Crude Fat* (%):  </label>
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
          <li>
            <label for="fibre">Max Crude Fibre* (%):  </label>
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
        </ul>
        <br></br>
        Select any additional nutrient included on your guaranteed analysis using the drop down menu. 
        <br></br>
        <br></br>

        <select class="selectBox" onChange={handleSelectChange}>
          <option value="Calcium (%):">Calcium</option>
          <option value="Phosphorous(%):">Phosphorous</option>
        </select>
        
        <ul class="flex-outer">
          {inputFields.map((label, index) => (
            <li key={index}>
              <label>{label}</label>
              <input type="text" />
              <button onClick={() => handleDeleteInput(index)}>X</button>
            </li>
          ))}
        </ul>

      <ul class="flex-outer">
        <li>
          <button type="submit">Submit</button>  
        </li> 
      </ul>    

    </Form>
  </div>
  
);
}

export {Diet_Form_Callback, DietInfo};
