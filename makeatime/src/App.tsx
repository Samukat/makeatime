import React, { useState, Component } from 'react';
import SliderNumber from './Components/SliderNumber/SliderNumber';
import DisplayNumberNAME from './Components/DisplayNumber/DisplayNumber'; //just wanted to illustrate import name can be whatever
import ReactDOM from 'react-dom';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout/index';
import HomePage from './Components/HomePage/index';

class App extends Component {
  render(): React.ReactNode {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage/>}></Route>
          </Route>
        </Routes>
      </>
    );
  }
}



//notes:
//function components:
//for simple comp
//
//class componets:
//maintain private data and complex ui and logic 


//Stuff can be done in the funcitonal form too - but i changed it to class

// function App() {
//   const [value, onChange] = useState(new Date());

//   return (
//     <>
//       <SliderNumber></SliderNumber>
//       <DisplayNumberNAME></DisplayNumberNAME>
//     </>
//   );
// }

export default App;
