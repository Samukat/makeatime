import React, { useState, Component } from 'react';
import SliderNumber from './Components/SliderNumber/SliderNumber';
import DisplayNumberNAME from './Components/DisplayNumber/DisplayNumber'; //just wanted to illustrate import name can be whatever
import './App.scss';

class App extends Component {
  render(): React.ReactNode {
    return (
      <>
        <SliderNumber></SliderNumber>
        <DisplayNumberNAME></DisplayNumberNAME>
      </>
    );
  }
}







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
