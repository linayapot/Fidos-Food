import logo from '../logo.svg';
import '../App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import { Component } from 'react';



function App () {
  return (
    <div className="App">
      <img src={logo} className="App-logo-first-page"  alt="doglogo" />
      <div className='second-header'>
        Is your dog's diet meeting all their essential needs? 
      </div>
      <p>
        Use this calculator to see how well your dog's nutrient requirements are being met. <br/>
      </p><p>
        Estimated nutrient requirements are based on National Research Council (NRC)’s Nutrient Requirements of Cats and Dogs, 2006
      </p>
      <div className='first-header'>
          <Link to={`/P2YourPetInfo`}>Estimate Your Dog's Diet</Link>     
      </div>    

    </div>);
  }


export default App;
