import { useEffect } from 'react';
import './App.css';
import Stopwatch from './stopwatch';
//import Test from './test';
import ReactGA4 from 'react-ga4';
const TRACKING_ID = "G-GLRPSJTREX"; 


function App() {

  useEffect(() => {
    ReactGA4.initialize(TRACKING_ID);
  }, [])

  return (  
    <div className='App'>
      <Stopwatch />
    </div>
  );
}

export default App;
