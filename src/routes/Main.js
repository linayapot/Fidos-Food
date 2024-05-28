import logo from '../logo.svg';
import '../App.css';
import {  Link} from "react-router-dom";

function App () {
  return (
    <div className="App">
      <img src={logo} className="App-logo"  alt="doglogo" />
      <div className='second-header'>
        How is your dogs nutrition?
      </div>
      <p>
        Use this calculator to check if your dog's nutrient requirements are being met. <br/>

      <br></br>
        Estimated nutrient requirements are based on National Research Council's Nutrient Requirements of Cats and Dogs, 2006
      </p>
      <br></br>
      <br></br>
      <div className='first-header'>
          <Link to={`/PetInfo`}>START</Link>     
      </div>    

    </div>);
  }


export default App;
