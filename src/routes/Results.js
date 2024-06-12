import {useLoaderData} from "react-router-dom";
import '../App.css';
import localforage from "localforage";
import {ME_Req, ME_Intake, rec_intake, SUL, names, units} from "../math.js";

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
          {props.perc}%
      </td>
    </tr>
  );
}

// use map function to iterate through object, skipping items with no nutrient requirements

function TransformDataForDisplay(user_data, names, units,rec_intake, SUL){
  let mbw=user_data.pet.mbw
  const output= []
  for (const key in user_data.diet){
    if (['kcal', 'unit', 'carb', 'amountAFmetric','amountAF','fibre','moisture', 'glucosamine'].includes(key) || user_data.diet[key] == "")
  	{ }
    else
      {
        let intake
        let req= rec_intake[key]*mbw
        let max= SUL[key]*mbw
        if (units[key]=='g'){
          intake = user_data.diet.amountAF*(user_data.diet[key]/100)
          }
        else if (units[key]== 'mg'){
          intake =(user_data.diet.amountAF/1000)*user_data.diet[key]              
        }
        else if (units[key]== 'μg'){ 
          intake =(user_data.diet.amountAF*user_data.diet[key])            
        }
        else if (units[key]== 'RE'){
          intake =((user_data.diet.amountAF/1000)*user_data.diet[key])/3.33           
        }

        output.push( {"name":names[key],
                "units":units[key],
                "req": Math.round(req),
                "intake": intake.toFixed(0),
                "perc":Math.round((intake/req)*100),
                "max": Math.round(max)
                })      
      }
  }
return output
}

function warningStatements (resultsdata){
  const output=[]
  let warningString
  for(var i=0;i<resultsdata.length;i++){
    if (isNaN(resultsdata[i].max))
      { }
    else if (resultsdata[i].intake  >= resultsdata[i].max){
        warningString = "Your dog's daily intake of " + resultsdata[i].name + " is " + Math.round(resultsdata[i].intake) + " " + resultsdata[i].units + ". This is above the safe upper limit of " + resultsdata[i].max  + " " + resultsdata[i].units + " per day."
        output.push(warningString);
        }
    }
    return output
  }

function glucosamineCheck(user_data){
  const output=[]
  let recGlucosamine
  if ( !("glucosamine" in user_data.diet) == true){
    console.log("There is no glucosamine key in the userdata object")
  }
  else{
    console.log( user_data.pet.metricweight)
    if (user_data.pet.metricweight <= 9){
      recGlucosamine = "250 - 500 mg per day. "
    }
    else if (user_data.pet.metricweight > 9 &&  user_data.pet.metricweight <= 19 ){
      recGlucosamine = "500 - 1,000 mg per day. "
    }
    else if (user_data.pet.metricweight > 19 &&  user_data.pet.metricweight <= 45 ){
      recGlucosamine = "1,000 - 1,500 mg per day. "
    }
    else if (user_data.pet.metricweight <= 45){
      recGlucosamine = "at least 1,500 mg per day. "
    }
    let glucosamineIntake = user_data.diet.amountAF/1000*user_data.diet.glucosamine
    let glucosamineSatement = "Your pet food provides " + glucosamineIntake + " mg  of glucosamine per day. For " + user_data.pet.name +"'s size, the recommeneded amount of glucosamine for joint health is " + recGlucosamine + "Due to mixed results in clinical trials, the benefits of glucosamine cannot be confirmed."
    output.push(glucosamineSatement);
    return output
  }
}

//Calculate the range for ME_Req

function MEVisualization({ MEReq, MEIntake }) {
  const lowerBound = Math.round(MEReq * 0.75)
  const upperBound = MEReq * 1.25;
  const percentage = ((MEIntake - lowerBound) / (upperBound - lowerBound)) * 100;
 
  return (
    <div className="me-visualization">
      <div className="bar">
        <div className="range" style={{ width: '100%' }}>
          <div className="marker" style={{ left: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="labels">
        <span>{lowerBound.toFixed(2)}</span>
        <span>{upperBound.toFixed(2)}</span>
      </div>
    </div>
  );
}

  export default function Results() {
  const user_data  = useLoaderData();
  const resultsdata = TransformDataForDisplay(user_data, names, units,rec_intake,SUL)
  const arrayWarningStatements = warningStatements(resultsdata)
  const glucosamineSatement = glucosamineCheck(user_data);
  /* Mapping the warningStatements into a new array of JSX nodes as arrayDataItems */
  const arrayToRender = arrayWarningStatements.map((warning) => <li>{warning}</li>);

  const MEReqValue = ME_Req(user_data.pet.metricweight, user_data.pet.factor);
  const MEIntakeValue = ME_Intake(user_data.diet.kcal, user_data.diet.amountAF);
  return (
    <div className="App">
      <div className="first-header"> 
        {user_data.pet.name}'s Results
      </div>  

      <MEVisualization MEReq={MEReqValue} MEIntake={MEIntakeValue} />   

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
            <td>{ME_Req(user_data.pet.metricweight,user_data.pet.factor)                }
            </td>
            <td>
              {ME_Intake(user_data.diet.kcal,user_data.diet.amountAF)}
            </td>
            <td>
              {Math.round((ME_Intake(user_data.diet.kcal,user_data.diet.amountAF)/(ME_Req(user_data.pet.metricweight,user_data.pet.factor))*100))}%
            </td>
          </tr>

          {resultsdata.map(
            (arr_item) => <NutrientRow //down the road enter the props from a list instead of individual props
                            key={arr_item.name} 
                            name={arr_item.name}
                            units={arr_item.units}
                            reqs={arr_item.req}
                            intake={arr_item.intake}
                            perc={arr_item.perc}
                            max={arr_item.max}
                          />)}   
        </tbody>
      </table>

      <div>

<br></br>
<div>
  {glucosamineSatement}
</div>
  <br></br>
  {arrayToRender.length > 0 ? <h2>WARNING </h2>: null}
  {/* returning arraWarningStatements wrapped in <ul> */}
  <ul className="flex-outer">{arrayToRender}</ul>
</div>

    </div>
  );
}
export { Results};
