import {Form,redirect} from "react-router-dom";
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
      <div className="first-header">
        Diet Info: 
      </div>
      <Form method="post" id="dietinfo">
      <ul class="flex-outer">
        <li className="floating-label" style={{marginTop:"15px"}}>
        <input required 
          id= "amountAF"
          placeholder="Daily amount of food"
          aria-label="Daily Amount of Food"
          type="number"
          name="amountAF"              
          min="0"
          defaultValue={300}
          className="floating-input"
        />
        <label htmlFor="amountAF" className="floating-label-text" > Daily Amount Fed </label>
        <div class="switch-field">
            <input type="radio" name="unit" id="g" value="g" defaultChecked={true}/>
            <label htmlFor="g"> G</label> 
            <input type="radio" name="unit" id="oz" value="oz"/>
            <label htmlFor="oz"> oz </label>
        </div>
        </li>
        </ul>
      {/* --------------------------------- */}
      <div className="second-header" style={{paddingBottom:"0px"}}>
        Guaranteed Analysis
      </div>
      <p style={{paddingBottom:"25px"}}>* indicates mandatory information</p>

      {/* --------------------------------- */}
        <ul class="flex-outer">
          <div className="columns">
            <li className="floating-label" >
                <input required 
                  id="kcal"
                  aria-label="The caloric density of the food"
                  type="number"
                  name="kcal"
                  min="0"
                  defaultValue={3500}
                  className="floating-input"
                />
            <label htmlFor="kcal" className="floating-label-text" >Calorie (kcal/kg): </label>
            </li>
            <li className="floating-label" >
              <input required 
                id="moisture"
                aria-label="Maximum amount of moisture"
                type="number"
                name="moisture"
                min="0"
                max="99"
                defaultValue={10}
                className="floating-input"
              />
              <label htmlFor="moisture" className="floating-label-text" >Moisture (%):  </label>
            </li>
          </div>
           {/* --------------------------------- */}
           <div className="columns">
            <li className="floating-label" >
              <input required 
                id="cp"
                aria-label="Minimum amount of crude protein"
                type="number"
                name="cp"
                min="0"
                max="99"
                defaultValue={18}
                className="floating-input"
              />
              <label htmlFor="cp" className="floating-label-text" >Crude Protein(%):  </label>
            </li>
            <li className="floating-label" >
              <input required 
                id="tfat"
                aria-label="Mnimum amount of crude fat"
                type="number"
                name="tfat"
                min="0"
                max="99"
                defaultValue={10}
                className="floating-input"
              />
              <label htmlFor="tfat" className="floating-label-text" >Crude Fat (%):  </label>
            </li>
          </div>
          {/* --------------------------------- */}
          <div className="columns">
            <li className="floating-label" >
              <input required
                id="fibre" 
                aria-label="Minimum amount of crude fibre"
                type="number"
                name="fibre"
                min="0"
                max="99"
                defaultValue={15}
                className="floating-input"
              />
              <label htmlFor="fibre" className="floating-label-text" >Crude Fibre (%):  </label>
            </li>
          <li className="floating-label" >
              <input 
                id="Ca" 
                aria-label="Minimum amount of calcium"
                type="number"
                name="Ca"
                min="0"
                max="99"
                step="0.1"
                className="floating-input"
              />
            <label htmlFor="Ca" className="floating-label-text" >Calcium (%):  </label>
            </li>
          </div>
          {/* --------------------------------- */}
          <div className="columns">
            <li className="floating-label" >
              <input 
                id="P" 
                aria-label="Minimum amount of phosphorous"
                type="number"
                name="P"
                min="0"
                max="99"
                step="0.1"
                className="floating-input"
              />
              <label htmlFor="P" className="floating-label-text" style={{width: "max-content"}} >Phosphorous (%):  </label>
            </li>
            <li className="floating-label" >
              <input 
                id="Se" 
                aria-label="Selenium Concentration"
                type="number"
                name="Se"
                min="0"
                max="2"
                step="0.1"
                className="floating-input"
              />
              <label htmlFor="Se" className="floating-label-text" >Selenium (mg/kg):  </label>
            </li>
          </div>

          {/* --------------------------------- */}
          <div className="columns">
          <li className="floating-label" >
            <input 
              id="vitE" 
              aria-label="Vitamin E Concentration"
              type="number"
              name="vitE"
              min="0"
              max="1000"
              className="floating-input"
            />
            <label htmlFor="vitE" className="floating-label-text" >Vitamin E (IU/kg):  </label>
          </li>
        </div>
        </ul>
        <br></br>
        Select any additional nutrient included on your guaranteed analysis using the drop down menu. 
        <br></br>
        <br></br>

        <select class="selectBox" onChange={handleSelectChange}>
          <option selected="true" disabled="disabled">Select Additional Nutrients</option>
          <option value="Vitamin A (IU/kg): " name="vitA">Vitamin A</option>
          <option value="Omega-3 FA(%): "name="ala">Omega-3 Fatty Acid</option>
          <option value="Omega-6 FA(%): " >Omega-6 Fatty Acid</option>
          <option value="DHA + EPA(%):" name= "epa_dha">DHA + EPA </option>
          <option value="Linoleic Acid: " name= "LA"> Linoleic Acid </option>

        </select>
        
        <ul class="flex-outer">
          {inputFields.map((option, index) => ( //renders the mapped dynamic input fields
            <li className="floating-label"  key={index}>
              <input className="floating-input"type="text" name={option.name} /> {/* Assign unique name so it can be entered into dataobkect*/}
              <label className="floating-label-text" >{option.value}</label>
              <button style={{marginLeft: "2px", paddingLeft:"6px", paddingRight:"6px",paddingTop:"3px", paddingBottom:"3px"}} onClick={(e) => handleDeleteInput(index,e)}>X</button>
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
