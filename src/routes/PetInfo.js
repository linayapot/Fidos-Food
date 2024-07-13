import {Form,redirect} from "react-router-dom";
import '../App.css';
import localforage from "localforage";
import {unitconv} from "../math.js";
import React, { useState,useEffect } from 'react';
import {dogBreeds} from "../dogbreed.js";

async function PetInfo_Form_Callback({ request}) {
  const formData = await request.formData();
  const formDataObj = {};
  formData.forEach((value, key) => formDataObj[key] = value);
  formDataObj.metricweight =unitconv(formDataObj.weight,formDataObj.unit)
  formDataObj.mbw =formDataObj.metricweight**0.75
  await localforage.setItem("pet", formDataObj)
  return redirect(`/DietInfo`);
}

function PetInfo() {
 
  // to allow for previously generated inputs to be re-added upon going back
  const [formData, setFormData] = useState({
    name: 'Fido',
    sex: 'male',
    bdate: '2018-01-01',
    SN: 'Y',
    weight: 45,
    unit: 'lb',
    breed: 'other',
    factor: '1.6',
    bcs:5
  });

  const blankFormData={
    name:' ',
    sex: 'male',
    bdate: '2018-01-01',
    SN: 'Y',
    weight:' ',
    unit: 'lb',
    breed: 'other',
    factor: '1.6',
    bcs:5
  }

  useEffect(() => {
    const fetchData = async () => {
      const savedData = await localforage.getItem("pet");
      if (savedData) {
        setFormData(savedData);
      }
    };
    fetchData();
  }, []);

  const handleClear = () => {
    setFormData(blankFormData);
    localforage.removeItem("pet");
  };  

  return (
    <div className="App">
      <div className="first-header">       
        Pet Info 
        <br></br>    

      </div>
        <Form method="post" id="doginfo">
        <ul class="flex-outer">
          <li className="floating-label">
            <input 
              required
              type="text"
              id="name"
              name="name"   
              className="floating-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}             
            />
            <label htmlFor="name" className="floating-label-text">Name</label>
            <div class="switch-field">
              <input 
                type="radio" 
                name="sex" 
                id="male" 
                value="male" 
                checked={formData.sex == 'male'}
                onChange={() => setFormData({ ...formData, sex: 'male' })}
              />
              <label htmlFor="male">Male</label>
              <input 
                type="radio" 
                name="sex" 
                id="female" 
                value="female"
                checked={formData.sex == 'female'}
                onChange={() => setFormData({ ...formData, sex: 'female' })}
              />
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
                  className="floating-input"
                  value={formData.bdate}
                  onChange={(e) => setFormData({ ...formData, bdate: e.target.value })}
                />
              <label htmlFor="birthdate" className="floating-label-text">Birthdate </label>
            </li>

            <li className="floating-label">
              <li class="switch-field" >
                <input 
                  type="radio" 
                  name="SN" 
                  id="Y" 
                  value="Y"
                  checked={formData.SN === 'Y'}
                  onChange={() => setFormData({ ...formData, SN: 'Y' })}
                />
                <label htmlFor="Y">Spy/Ntrd</label>
                <input 
                  type="radio" 
                  name="SN" 
                  id="N" 
                  value="N"
                  checked={formData.SN === 'N'}
                  onChange={() => setFormData({ ...formData, SN: 'N' })}
                />
                <label htmlFor="N">Intact</label> 
              </li>
            </li>
          </div>
         {/* --------------------------------- */}  
          <li className="floating-label" style={{wrap:"nowrap"}}>
            <input required
              id ="bodyweight"
              aria-label="Weight of Dog"
              type="number"
              name="weight"
              min="1"
              className="floating-input"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
            <label htmlFor="bodyweight" className="floating-label-text">Weight</label>
            <div class="switch-field" >
              <input 
                type="radio" 
                name="unit" 
                id="lb" 
                value="lb" 
                checked={formData.unit === 'lb'}
                onChange={() => setFormData({ ...formData, unit: 'lb' })}
              />
              <label htmlFor="lb">lb</label> 
              <input 
                type="radio" 
                name="unit" 
                id="kg" 
                value="kg"
                checked={formData.unit === 'kg'}
                onChange={() => setFormData({ ...formData, unit: 'kg' })}
              />
              <label htmlFor="kg">kg</label> 
            </div>
          </li>
          {/* --------------------------------- */}
          <li className="floating-label">
            <select 
              name="breed" 
              id="breed"  
              className="selectBox floating-input"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            >
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
            <select 
              name="factor" 
              id="factor" 
              required 
              className="selectBox" 
              itemStyle={{height:"32px"}}
              value={formData.factor}
              onChange={(e) => setFormData({ ...formData, factor: e.target.value })}
            >
              <option value="1.2">Adult, Inactive or Senior</option>
              <option value="1.6">Adult, Active & Neutered</option>
              <option value="1.8">Adult, Active & Intact</option>
              <option value="2">Working Dog (light work)</option>
              <option value="3">Working Dog (medium work)</option>
              <option value="4">Working Dog (heavy work)</option>
            {/*<option value="3">Puppy (0 - 4 months) </option>
             //<option value="2">Puppy (4 - 12 months) </option>*/}
            </select>
            <label htmlFor="factor" className="floating-label-text" style={{top: "-22px"}}>Lifestyle  </label>
            </li>
          {/* --------------------------------- */}
          <li className="floating-label">
            <select 
              name="bcs" 
              id="bcs" 
              required 
              className="selectBox" 
              itemStyle={{height:"32px"}}
              value={formData.bcs}
              onChange={(e) => setFormData({ ...formData, bcs: e.target.value })}
            >
              <option value="1">1 - Emaciated</option>
              <option value="2">2 - Very Thin</option>
              <option value="3">3 - Thin </option>
              <option value="5">4 & 5 - Ideal Weight </option>
              <option value="6">6 - Overweight</option>
              <option value="7">7 - Heavy</option>
              <option value="8">8 - Obese </option>
              <option value="9">9 - Severely Obese </option>
            </select>
            <label htmlFor="factor" className="floating-label-text" style={{top: "-22px"}}>Body Condition Score</label>
            </li>
          <li style={{justifyContent:"flex-end"}}>
            <button type="button" className="button2" onClick={handleClear} > Clear</button>  
            <button type="submit" className="button" >Next </button>  
          </li>
        </ul>
      </Form>
    </div>
  );
}

export {PetInfo_Form_Callback, PetInfo};