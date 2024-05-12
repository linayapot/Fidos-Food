import {Form,redirect} from "react-router-dom";
import logo from '../logo.svg';
import '../App.css';
import localforage from "localforage";
import {unitconv} from "../math.js";

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
  return (
    <div className="App">
      <img src={logo} className="App-logo"  alt="doglogo" />
      <div className="first-header">       
        Enter Your Dog's Information 
      </div>
        <Form method="post" id="doginfo">
        <ul class="flex-outer">
        {/* --------------------------------- */}
          <li>
            <label htmlFor="name">Name:</label>
            <input
                placeholder="Fido"
                aria-label="Dog's Name"
                type="text"
                id="name"
                name="dogname"
            />
          </li>
        {/* --------------------------------- */}
          <li>
            <p>Sex:</p>        
            <ul class="flex-inner">
            <li>
              <input type="radio" name="sex" id="male" value="male"/>
              <label htmlFor="male">M</label>
              <input type="radio" name="sex" id="female" value="female"/>
              <label htmlFor="female">F</label> 
              </li>
            </ul>
          </li>
        {/* --------------------------------- */}
          <li>
            <label htmlFor="birthdate"> Birthdate: </label>
              <input required
                id="birthdate"
                type="date"
                name="bdate"
                placeholder="mm/dd/yyyy"
                value="2013-01-08"
              />
          </li>
        {/* --------------------------------- */}
          <li>
            <p>Spayed/Neutered:</p>        
            <ul class="flex-inner">
            <li>
              <input type="radio" name="SN" id="Y" value="Y" defaultChecked={true}/>
              <label htmlFor="Y">Y</label>
              <input type="radio" name="SN" id="N" value="N"/>
              <label htmlFor="N">N</label> 
            </li>
          </ul>
          </li>
        {/* --------------------------------- */}
          <li>
          <label htmlFor="breed"> Breed: </label>
              <input
                id="breed"
                placeholder="Golden Retriever"
                aria-label="Type of Breed"
                type="text"
                name="breed"
              />
          </li>      
        {/* --------------------------------- */}   
          <li>
            <label htmlFor="bodyweight"> Body Weight: </label>
            <input required
              id ="bodyweight"
              placeholder="45"
              defaultValue={45}
              aria-label="Weight of Dog"
              type="number"
              name="weight"
              min="1"
            />
          </li>
        {/* --------------------------------- */}
          <li>
            <p>Units:</p>        
            <ul class="flex-inner">
              <li>
                <input type="radio" required name="unit" id="lb" value="lb" defaultChecked={true}/>
                <label htmlFor="lb">lb</label> 
                <input type="radio" required name="unit" id="kg" value="kg"/>
                <label htmlFor="kg">kg</label> 
              </li>
            </ul>       
          </li>
        {/* --------------------------------- */}
          <li>
            <label htmlFor="bcs">Body Condition:  </label>
              <select name="bcs" id="bcs" required class="selectBox">
                <option value="1">1 - Emaciated</option>
                <option value="2">2 - Very Thin</option>
                <option value="3">3 - Slightly Thin</option>
                <option selected value="4">4 - Ideal </option>
                <option value="5">5 - Ideal</option>
                <option value="6">6 - Slightly Overweight</option>
                <option value="7">7 - Overweight</option>
                <option value="8">8 - Very Overweight (light work)</option>
                <option value="9">9 - Obese (medium work)</option>
              </select>     
          </li>
        {/* --------------------------------- */}
          <li>
            <label htmlFor="factor">Lifestyle:  </label>
            <select name="factor" id="factor" required class="selectBox">
              <option selected value="1.6">Neutered Adult, average activity</option>
              <option value="1.8">Intact Adult, average activity</option>
              <option value="1.2">Inactive/Senior</option>
              <option value="2">Working Dog (light work)</option>
              <option value="3">Working Dog (medium work)</option>
              <option value="4">Working Dog (heavy work)</option>
              <option value="3">Puppy (0 - 4 months) </option>
              <option value="2">Puppy (4 - 12 months) </option>
            </select>
         </li>
        {/* --------------------------------- */}
          <li>
            <button type="submit">Next Step</button>          
          </li>
        </ul>
      </Form>
    </div>
  );
}

export {PetInfo_Form_Callback, PetInfo};