import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import './index.css';
// import App from './App';
import App from './routes/p1';
import {P2YourPetInfo, petinfo_form_callback} from './routes/p2';
import {P3YourFoodInfo, dietinfo_form_callback} from './routes/p3';
import {P4Results, loader} from './routes/p4';

import reportWebVitals from './reportWebVitals';
// import { action } from './routes/p2';



const my_data = {'test2':'foo'}
const p1App = <App my_data={my_data}/>;
const p3App = <P3YourFoodInfo my_data={my_data}/>


const router = createBrowserRouter([
      {
        path: "/",
        id: 'p1',
        element: p1App,
      },
      {
        path: "P2YourPetInfo",
        element: <P2YourPetInfo />,
        action: petinfo_form_callback,
      },
      {
        path: "P3YourFoodInfo",
        element: <P3YourFoodInfo/>,
        action: dietinfo_form_callback,
      },
      {
        path: "P4Results",
        element: <P4Results/>,
        loader: loader,
      },
]);


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
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
