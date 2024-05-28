import {useLoaderData} from "react-router-dom";
import '../App.css';
import localforage from "localforage";
import {ME_Req, ME_Intake, rec_intake, names, units} from "../math.js";

export async function loader() {
  let pet = await localforage.getItem("pet")
  let diet = await localforage.getItem("diet")
    return {"pet":pet, "diet":diet};
}

export function NutrientRow(props){ //component name must start with capital; they return a single DOM HTML element
  return(    
    <tr>
      <td>
          {props.name} 
      </td>
      <td>
          {props.units} 
      </td>
      <td>
          {props.reqs}
      </td>
      <td>
          {props.intake}
      </td>
      <td>
          {props.perc} %
      </td>
    </tr>
  );
}

// use map function to iterate through object, skipping items with no nutrient requirements

function TransformDataForDisplay(user_data, names, units,rec_intake){
  let mbw=user_data.pet.mbw
  const output= []
  for (const key in user_data.diet){
    if (['kcal', 'unit', 'carb', 'intake','amountAF','fibre','moisture'].includes(key) || user_data.diet[key] == "")
  	{ }
    else
      {
        let intake
        let req= rec_intake[key]*mbw
        if (units[key]=='g'){
          intake = user_data.diet.amountAF*(user_data.diet[key]/100)
          }
        else if (units[key]== 'mg'){
          intake =(user_data.diet.amountAF/1000)*user_data.diet[key] 
             
        }
        else if (units[key]== 'μg'){
          intake =(user_data.diet.amountAF*user_data.diet[key])
              
        }

        output.push( {"name":names[key],
                "units":units[key],
                "req": Math.round(req),
                "intake": intake.toFixed(1),  
                "perc":Math.round((intake/req)*100)
                })      
      }
  }
return output
}
 
export default function Results() {
  const user_data  = useLoaderData();
  console.log(user_data)
  const sampledata = TransformDataForDisplay(user_data, names, units,rec_intake)
  console.log(sampledata)
  return (
    <div className="App">
      <div className="first-header"> 
        Results
      </div>     

      <table>
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Unit</th>
            <th>Required</th>
            <th>Intake</th>
            <th>% of <br></br>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Metabolizable Energy</td>
            <td>kcal</td>
            <td>{ME_Req(user_data.pet.weight,user_data.pet.factor)                }
            </td>
            <td>
              {ME_Intake(user_data.diet.kcal,user_data.diet.amountAF)}
            </td>
            <td>
              {Math.round((ME_Intake(user_data.diet.kcal,user_data.diet.amountAF)/(ME_Req(user_data.pet.weight,user_data.pet.factor))*100))} %
            </td>
          </tr>

          {sampledata.map(
            (arr_item) => <NutrientRow //down the road enter the props from a list instead of individual props
                            key={arr_item.name} 
                            name={arr_item.name}
                            units={arr_item.units}
                            reqs={arr_item.req}
                            intake={arr_item.intake}
                            perc={arr_item.perc}
                          />)}   
        </tbody>
      </table>

    </div>
  );
}
export { Results};
