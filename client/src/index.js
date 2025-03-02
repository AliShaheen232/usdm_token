import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/fonts/GOTHIC.TTF"
import "./assets/fonts/GOTHICB.TTF"

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastStyle={{ backgroundColor: "#000",color:"white" }}
    />


    <App />
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
