import {Form,redirect} from "react-router-dom";
import '../App.css';
import localforage from "localforage";
import {unitconv} from "../math.js";
import React, { useState,useEffect } from 'react';
import {dogBreeds} from "../dogbreed.js";

async function PetInfo_Form_Callback({ request, params }) {
  const formData = await request.formData();
  const formDataObj = {};
  formData.forEach((value, key) => formDataObj[key] = value);
  formDataObj.weight =unitconv(formDataObj.weight,formDataObj.unit)
  formDataObj.mbw =formDataObj.weight**0.75
  localforage.setItem("pet", formDataObj)
  return redirect(`/DietInfo`);
}

function PetInfo() {

  //for BCS slider
  const [value, setValue] = useState(5);

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  // to autopopulate form with previously entered user values if user navigaetes back


  //   const [formData, setFormData] = useState({
  //     name: " ",
  //     sex: "  ",
  //     bdate: " ",
  //     SN: " ",
  //     weight: " ",
  //     unit: " ",
  //     breed: " ",
  //     factor: " "
  //   })};
  
    // useEffect(() => {
    //   const fetchFormData = async () => {
    //     const storedFormData = await localforage.getItem("pet");
    //     if (storedFormData) {
    //       setFormData(storedFormData);
    //     }
    //   };
    //   fetchFormData();
    // }, []);
  


  return (
    <div className="App">
      <div className="first-header">       
        Pet Info 
        <br></br>    

      </div>
        <Form method="post" id="doginfo">
        <ul class="flex-outer">
          <li className="floating-label">
            <input required
              value="Fido"
              type="text"
              id="name"      
              className="floating-input"
            />
            <label htmlFor="name" className="floating-label-text">Name</label>
            <div class="switch-field">
              <input type="radio" name="sex" id="male" value="male" defaultChecked={true}/>
              <label htmlFor="male">Male</label>
              <input type="radio" name="sex" id="female" value="female"/>
              <label htmlFor="female">Female</label> 
            </div>

          </li>
          {/* --------------------------------- */}
          <div style={{display:"flex", paddingBottom:"0px"}}>
            <li className="floating-label">
              <input required
                  id="birthdate"
                  type="date"
                  name="bdate"
                  placeholder="mm/dd/yyyy"
                  value="2013-01-08"
                  className="floating-input"
                />
              <label htmlFor="birthdate" className="floating-label-text">Birthdate </label>
            </li>

            <li className="floating-label">
              <li class="switch-field" >
                <input type="radio" name="SN" id="Y" value="Y" defaultChecked={true}/>
                <label htmlFor="Y">Spy/Ntrd</label>
                <input type="radio" name="SN" id="N" value="N"/>
                <label htmlFor="N">Intact</label> 
              </li>
            </li>
          </div>
         {/* --------------------------------- */}  
          <li className="floating-label" style={{wrap:"nowrap"}}>
            <input required
              id ="bodyweight"
              defaultValue={45}
              aria-label="Weight of Dog"
              type="number"
              name="weight"
              min="1"
              inputMode="numeric"
              className="floating-input"
            />
            <label htmlFor="bodyweight" className="floating-label-text">Weight</label>
            <div class="switch-field" >
              <input type="radio" required name="unit" id="lb" value="lb" defaultChecked={true}/>
              <label htmlFor="lb">lb</label> 
              <input type="radio" required name="unit" id="kg" value="kg"/>
              <label htmlFor="kg">kg</label> 
            </div>
          </li>
          {/* --------------------------------- */}
          <li className="floating-label">
            <select name="breed" id="breed"  className="selectBox floating-input">
              <option value="other">Mixed/Other</option>
                {/* Convert the dogBreeds list to an array and then map over it */}
                {[...dogBreeds].map((breed, index) => (
                <option key={index} value={breed}>{breed}</option>
                ))}
            </select>
            <label htmlFor="breed" className="floating-label-text" style={{top: "-22px"}}>Breed</label>
          </li>    
          {/* --------------------------------- */}
          <li className="floating-label">
            <select name="factor" id="factor" required class="selectBox" itemStyle={{height:"32px"}}>
              <option selected value="1.6">Neutered Adult, average activity</option>
              <option value="1.8">Intact Adult, average activity</option>
              <option value="1.2">Inactive/Senior</option>
              <option value="2">Working Dog (light work)</option>
              <option value="3">Working Dog (medium work)</option>
              <option value="4">Working Dog (heavy work)</option>
              <option value="3">Puppy (0 - 4 months) </option>
              <option value="2">Puppy (4 - 12 months) </option>
            </select>
            <label htmlFor="factor" className="floating-label-text" style={{top: "-22px"}}>Lifestyle  </label>
            </li>
          {/* --------------------------------- */}
          <label htmlFor="bcs" style={{textTransform: "uppercase"}}>  Body Condition: </label>
          <li className="floating-label">
            <div className="container">
              <div className="value">{value}</div>
                <input 
                  type="range" 
                  min="1" 
                  max="9" 
                  step="1" 
                  value={value} 
                  onChange={handleChange} 
                  className="slider" 
                />
                <div className="labels">
                  <span>Emaciated</span>
                  <span>Ideal</span>
                  <span>Obese</span>
                </div>
              </div>
          </li>
          <li>
            <button type="submit">Next Step</button>          
          </li>
        </ul>
      </Form>
    </div>
  );
}

export {PetInfo_Form_Callback, PetInfo};