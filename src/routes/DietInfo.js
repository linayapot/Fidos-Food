import {Form,redirect} from "react-router-dom";
import '../App.css';
import localforage from "localforage";
import {unitconv} from "../math.js";
import React, { useState,useEffect } from 'react';


async function Diet_Form_Callback({ request}) {
  const formData = await request.formData();
  const formDataObj = {};
  formData.forEach((value, key) => formDataObj[key] = value);
  formDataObj.amountAFmetric =unitconv(formDataObj.amountAF,formDataObj.unit)
  await localforage.setItem("diet", formDataObj)
  return redirect(`/Results`);
}

export default function DietInfo() {
      
  const [inputFields, setInputFields] = useState([]);

  //creates the array from changes in the select drop down menue
  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedName = selectedOption.getAttribute("name");
    const newInputFields = [...inputFields, { value: selectedValue, name: selectedName, inputValue: '' }];
    setInputFields(newInputFields);
    localforage.setItem("selectedOptions", newInputFields);
  };

  const handleInputFieldChange = (index, e) => {
    const newInputFields = [...inputFields];
    newInputFields[index].inputValue = e.target.value;
    setInputFields(newInputFields);
    localforage.setItem("selectedOptions", newInputFields);
  };

  const handleDeleteInput = (index, event) => {
    event.preventDefault(); // Prevent form submission 
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
    localforage.setItem("selectedOptions", newInputFields);
  };

  // to allow for previously generated inputs to be re-added upon going back
  const [formData, setFormData] = useState({
    amountAF: ' 300' ,
    unit: 'g',
    kcal: ' ',
    moisture: '',
    cp: ' ',
    tfat: ' ',
    fibre: ' ',
    Ca: ' ',
    P: ' ',
    Se: ' '
  });

  const blankFormData={
    amountAF: ' ' ,
    unit: 'g',
    kcal: ' ',
    moisture: '10',
    cp: ' ',
    tfat: ' ',
    fibre: ' ',
    Ca: ' ',
    P: ' ',
    Se: ' '
  }

  useEffect(() => {
    const fetchData = async () => {
      const savedData = await localforage.getItem("diet");
      if (savedData) {
        setFormData(savedData);
      }
      const savedInputFields = await localforage.getItem("selectedOptions");
      if (savedInputFields) {
        setInputFields(savedInputFields);
      }
    };
    fetchData();
  }, []);

  const handleClear = () => {
    setFormData(blankFormData);
    setInputFields([]);
    localforage.removeItem("diet");
    localforage.removeItem("selectedOptions");
  };


  return (
    <div className="App" >
      <div className="first-header">
        Diet Info 
        <br></br>
      </div>
      <Form method="post" id="dietinfo">
      <ul className="flex-outer">        
      <div className="columns">
        <li className="floating-label" style={{marginTop:"15px"}}>
          <input 
            required 
            aria-label="Daily Amount of Food"
            type="number"
            name="amountAF"
            id= "amountAF"              
            min="0"
            className="floating-input" 
            inputMode="numeric"
            step="0.1"
            value={formData.amountAF}
            onChange={(e) => setFormData({ ...formData, amountAF: e.target.value })}  
          />
          <label htmlFor="amountAF" className="floating-label-text" style ={{top:"-22px"}}>Daily Amount Fed* </label>
        </li>

          <li className="switch-field" style= {{alignItems: "start", paddingTop:"8px"}}>
              <input 
                type="radio" 
                name="unit" 
                id="g" 
                value="g" 
                checked={formData.unit === 'g'}
                onChange={() => setFormData({ ...formData, unit: 'g' })}
              />
              <label htmlFor="g">g</label> 
              <input 
                type="radio" 
                name="unit" 
                id="oz" 
                value="oz"
                checked={formData.unit === 'oz'}
                onChange={() => setFormData({ ...formData, unit: 'oz'})}
              />
              <label htmlFor="oz">oz</label>
          </li>

      </div>
        <div className="columns">
          <li className="floating-label" >
            <input 
              required 
              aria-label="The caloric density of the food"
              type="number"
              name="kcal"
              min="0"
              className="floating-input"
              inputMode="numeric"
              value={formData.kcal}
              onChange={(e) => setFormData({ ...formData, kcal: e.target.value })}  
            />
            <label htmlFor="kcal" className="floating-label-text" style ={{top:"-22px"}}>Calorie (kcal/kg)* </label>
          </li>
          <li className="floating-label" >
              <input 
                required 
                aria-label="Maximum amount of moisture"
                type="number"
                name="moisture"
                id="moisture"
                min="0"
                className="floating-input"              
                inputMode="numeric"
                value={formData.moisture}
                onChange={(e) => setFormData({ ...formData, moisture: e.target.value })}  
              />
              <label htmlFor="moisture" className="floating-label-text"style ={{top:"-22px"}} >Moisture (%)*  </label>
          </li>
        </div>

           {/* --------------------------------- */}
           <div className="columns">
            <li className="floating-label" >
              <input 
                required 
                id="cp"
                aria-label="Minimum amount of crude protein"
                type="number"
                name="cp"
                min="0"
                className="floating-input"
                inputMode="numeric"
                value={formData.cp}
                onChange={(e) => setFormData({ ...formData, cp: e.target.value })}  
              />
              <label htmlFor="cp" className="floating-label-text"  style ={{top:"-22px"}}>Crude Protein(%)*  </label>
            </li>
            <li className="floating-label" >
              <input 
                required 
                id="tfat"
                aria-label="Mnimum amount of crude fat"
                type="number"
                name="tfat"
                min="0"
                className="floating-input"
                inputMode="numeric"
                value={formData.tfat}
                onChange={(e) => setFormData({ ...formData, tfat: e.target.value })}  
              />
              <label htmlFor="tfat" className="floating-label-text" style ={{top:"-22px"}}>Crude Fat (%)*  </label>
            </li>
          </div>
          {/* --------------------------------- */}
          <div className="columns">
            <li className="floating-label" >
              <input 
                required
                id="fibre" 
                aria-label="Minimum amount of crude fibre"
                type="number"
                name="fibre"
                min="0"
                className="floating-input"
                inputMode="numeric"
                value={formData.fibre}
                onChange={(e) => setFormData({ ...formData, fibre: e.target.value })}  
              />
              <label htmlFor="fibre" className="floating-label-text" style ={{top:"-22px"}}>Crude Fibre (%)*  </label>
            </li>
          <li className="floating-label" >
              <input 
                id="Ca" 
                aria-label="Minimum amount of calcium"
                type="number"
                name="Ca"
                min="0"
                className="floating-input"
                inputMode="numeric"
                step="0.1"
                value={formData.Ca}
                onChange={(e) => setFormData({ ...formData, Ca: e.target.value })}  
              />
            <label htmlFor="Ca" className="floating-label-text" style ={{top:"-22px"}}>Calcium (%) </label>
            </li>
          </div>
          {/* --------------------------------- */}
          <div className="columns" style={{bottomMargin:"0px"}}>
            <li className="floating-label"  style={{paddingBottom:"5px"}}>
              <input 
                aria-label="Minimum amount of phosphorous"
                type="number"
                name="P"
                id="P" 
                min="0"
                className="floating-input"
                inputMode="numeric"
                step="0.1"
                value={formData.P}
                onChange={(e) => setFormData({ ...formData, P: e.target.value })}  
              />
              <label htmlFor="P" className="floating-label-text" style ={{top:"-22px"}} >Phosphorous (%) </label>
            </li>
            <li className="floating-label" style={{paddingBottom:"5px"}} >
              <input 
                aria-label="Selenium Concentration"
                type="number"
                id="Se" 
                name="Se"
                min="0"
                className="floating-input"
                inputMode="numeric"
                step="0.11"
                value={formData.Se}
                onChange={(e) => setFormData({ ...formData, Se: e.target.value })}  
              />
              <label htmlFor="Se" className="floating-label-text" style ={{top:"-22px"}}>Selenium (mg/kg)  </label>
            </li>
          </div>
          <p style={{fontSize:"12px"}}> *Mandatory information</p>
        </ul>

        <select className="selectBox" onChange={handleSelectChange} style={{marginBottom:"25px"}} >
          <option selected="true" disabled="disabled">Select Additional Nutrients</option>
          <option value="Copper (mg/kg) " name= "Cu"> Copper </option>
          <option value="DHA + EPA (%) " name= "epa_dha">DHA + EPA </option>
          <option value="Glucosamine (ppm) " name= "glucosamine"> Glucosamine </option>
          <option value="Iodine (mg/kg) " name= "I"> Iodine</option>
          <option value="Linoleic Acid (%)" name= "la"> Linoleic Acid </option>
          <option value="Lysine (%) " name= "Lys"> Lysine </option>
          <option value="Manganese (mg/kg) " name= "Mn"> Manganese </option>
          <option value="Magnesium (%) " name= "Mg"> Magnesium </option>
          <option value="Methionine (%) " name= "Met"> Methionine </option>
          <option value="Omega-3 FA (%) "name="ala">Omega-3 Fatty Acid</option>
          <option value="Omega-6 FA (%) " >Omega-6 Fatty Acid</option>
          <option value="Sodium (%) " name= "Na"> Sodium </option>          
          <option value="Vitamin A (IU/kg) " name="vitA">Vitamin A</option>
          <option value="Vitamin E (IU/kg) " name="vitE">Vitamin E</option>
          <option value="Vitamin D (IU/kg) " name="vitD">Vitamin D</option>
          <option value="Zinc (mg/kg) " name= "Zn"> Zinc </option>

        </select>
        
        <ul class="flex-outer">
          {inputFields.map((option, index) => ( //renders the mapped dynamic input fields
            <li className="floating-label"  key={index}>
              <input 
                className="floating-input"
                type="number" 
                inputMode="numeric" 
                name={option.name}
                value={option.inputValue}
                step="0.1"
                onChange={(e) => handleInputFieldChange(index, e)}
              />{/* Assign unique name so it can be entered into dataobkect*/}
              <label className="floating-label-text" style ={{top:"-22px"}} >{option.value}</label>
              <button className="button" style={{marginLeft: "2px", paddingLeft:"6px", paddingRight:"6px",paddingTop:"3px", paddingBottom:"3px"}} onClick={(e) => handleDeleteInput(index,e)}>X</button>
            </li>
          ))}

          <li style={{justifyContent:"flex-end"}}>
              <button type="button" className="button2" onClick={handleClear} > Clear</button>  
              <button type="submit" className="button" >Next </button>  
          </li>
          <br></br>
        </ul> 

        <p> NOTE: PPM is the same as mg/kg. These units are interchangeable</p> 
        <br></br>
        <p>Reach out to the pet food manufacturer if you'd like a more complete nutritional profile on your dog food</p>

   

    </Form>
  </div>
  
);
}

export {Diet_Form_Callback, DietInfo};
