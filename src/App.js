import { useEffect } from 'react';
import './App.css';
import Stopwatch from './stopwatch';
//import Test from './test';
import ReactGA from 'react-ga';

function App() {
  useEffect(() => {
    ReactGA.pageview('/');
  }, [])

  return (  
    <div className='App'>
      <Stopwatch />
    </div>
  );
}

export default App;
