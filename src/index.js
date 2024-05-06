import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";

import './index.css';
import App from './routes/Main';
import {PetInfo, PetInfo_Form_Callback} from './routes/PetInfo';
import {DietInfo, Diet_Form_Callback} from './routes/DietInfo';
import {Results, loader} from './routes/Results';



const router = createHashRouter([
      {
        path: "/",
        id: 'p1',
        element: <App/>
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
    <RouterProvider router={router} />
);



