import logo from '../logo.svg';
import '../App.css';
import { Link} from "react-router-dom";

function App () {
  return (
    <div className="App" style={{ maxWidth:"600px"}}>
      <img src={logo} className="App-logo"  alt="doglogo" />
      <div className='second-header'>
        How is your dogs nutrition?
      </div>
      <p style ={{textAlign:"left"}}>
        <br/>
        This simple calculator helps determine if your dog's nutrient needs are being met by their dog food.
        <br></br>
        <br></br>
         Before starting, weigh your dog's <b>daily</b> food intake using a kitchen scale. 
         <br></br>
         <br></br>
         Nutrient requirements are based on the 2006 National Research Council's "Nutrient Requirements of Cats and Dogs."
      </p>
      <div className='first-header'>
      <Link to="/PetInfo">
        <button type="button" className="button2">START</button>
    </Link>     
    </div> 

    </div>);
  }


export default App;
