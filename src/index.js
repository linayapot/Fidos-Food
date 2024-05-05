import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  Outlet,
  createHashRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import './index.css';
// import App from './App';
import App from './routes/Main';
import {PetInfo, PetInfo_Form_Callback} from './routes/PetInfo';
import {DietInfo, Diet_Form_Callback} from './routes/DietInfo';
import {Results, loader} from './routes/Results';

import reportWebVitals from './reportWebVitals';
// import { action } from './routes/p2';



const my_data = {'test2':'foo'}
const p1App = <App my_data={my_data}/>;
const p3App = <DietInfo my_data={my_data}/>


const router = createHashRouter([
      {
        path: "/",
        id: 'p1',
        element: p1App,
      },
      {
        path: "PetInfo",
        element: <PetInfo/>,
        action: PetInfo_Form_Callback,
      },
      {
        path: "DietInfo",
        element: <DietInfo/>,
        action: Diet_Form_Callback,
      },
      {
        path: "Results",
        element: <Results/>,
        loader: loader,
      },
]);


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
