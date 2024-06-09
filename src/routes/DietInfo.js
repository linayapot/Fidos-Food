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
        Diet Info 
        <br></br>
      </div>
      <Form method="post" id="dietinfo">
      <ul className="flex-outer">
        
      <div className="columns">
        <li className="floating-label" style={{marginTop:"15px"}}>
          <input required 
            id= "amountAF"
            aria-label="Daily Amount of Food"
            type="number"
            name="amountAF"              
            min="0"
            defaultValue={300}
            className="floating-input" 
            inputMode="numeric"
          />
          <label htmlFor="amountAF" className="floating-label-text" style ={{top:"-22px"}}>Daily Amount Fed* </label>
        </li>

          <li className="switch-field" style= {{alignItems: "start", paddingTop:"8px"}}>
              <input type="radio" name="unit" id="g" value="g" defaultChecked={true}/>
              <label htmlFor="g"> G</label> 
              <input type="radio" name="unit" id="oz" value="oz"/>
              <label htmlFor="oz"> oz </label>
          </li>

      </div>

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
              inputMode="numeric"
              />
            <label htmlFor="kcal" className="floating-label-text" style ={{top:"-22px"}}>Calorie (kcal/kg)* </label>
          </li>
          <li className="floating-label" >
              <input required 
                id="moisture"
                aria-label="Maximum amount of moisture"
                type="number"
                name="moisture"
                min="0"
                defaultValue={10}
                className="floating-input"              
                inputMode="numeric"
              />
              <label htmlFor="moisture" className="floating-label-text"style ={{top:"-22px"}} >Moisture (%)*  </label>
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
                defaultValue={18}
                className="floating-input"
                inputMode="numeric"
              />
              <label htmlFor="cp" className="floating-label-text"  style ={{top:"-22px"}}>Crude Protein(%)*  </label>
            </li>
            <li className="floating-label" >
              <input required 
                id="tfat"
                aria-label="Mnimum amount of crude fat"
                type="number"
                name="tfat"
                min="0"
                defaultValue={10}
                className="floating-input"
                inputMode="numeric"
              />
              <label htmlFor="tfat" className="floating-label-text" style ={{top:"-22px"}}>Crude Fat (%)*  </label>
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
                defaultValue={15}
                className="floating-input"
                inputMode="numeric"
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
                step="0.1"
                className="floating-input"
                inputMode="numeric"
              />
            <label htmlFor="Ca" className="floating-label-text" style ={{top:"-22px"}}>Calcium (%) </label>
            </li>
          </div>
          {/* --------------------------------- */}
          <div className="columns" style={{bottomMargin:"0px"}}>
            <li className="floating-label"  style={{paddingBottom:"5px"}}>
              <input 
                id="P" 
                aria-label="Minimum amount of phosphorous"
                type="number"
                name="P"
                min="0"
                step="0.1"
                className="floating-input"
                inputMode="numeric"
              />
              <label htmlFor="P" className="floating-label-text" style ={{top:"-22px"}} >Phosphorous (%) </label>
            </li>
            <li className="floating-label" style={{paddingBottom:"5px"}} >
              <input 
                id="Se" 
                aria-label="Selenium Concentration"
                type="number"
                name="Se"
                min="0"
                step="0.1"
                className="floating-input"
                inputMode="numeric"
              />
              <label htmlFor="Se" className="floating-label-text" style ={{top:"-22px"}}>Selenium (mg/kg)  </label>
            </li>
          </div>
          <p style={{fontSize:"12px"}}> *Mandatory information</p>
        </ul>

        <select className="selectBox" onChange={handleSelectChange} >
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
          <option value="Vitamin D (IU/kg) " name="vitD">Vitamin D</option>
          <option value="Zinc (mg/kg) " name= "Zn"> Zinc </option>

        </select>
        
        <ul class="flex-outer">
          {inputFields.map((option, index) => ( //renders the mapped dynamic input fields
            <li className="floating-label"  key={index}>
              <input className="floating-input"type="number" inputMode="numeric" name={option.name} /> {/* Assign unique name so it can be entered into dataobkect*/}
              <label className="floating-label-text" style ={{top:"-22px"}} >{option.value}</label>
              <button style={{marginLeft: "2px", paddingLeft:"6px", paddingRight:"6px",paddingTop:"3px", paddingBottom:"3px"}} onClick={(e) => handleDeleteInput(index,e)}>X</button>
            </li>
          ))}
        </ul>

      <ul class="flex-outer">
        <li>
          <button type="submit">Submit</button>  
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
