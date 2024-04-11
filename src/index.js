import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA4 from 'react-ga4';
const TRACKING_ID = "G-GLRPSJTREX"; // OUR_TRACKING_ID

const root = ReactDOM.createRoot(document.getElementById('root'));

ReactGA4.initialize(TRACKING_ID);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const SendAnalytics = ()=> {
}

reportWebVitals(SendAnalytics);
