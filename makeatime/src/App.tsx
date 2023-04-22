import DateTimePicker from 'react-datetime-picker';

import React, { useState } from 'react';
import TimeSheet from './TimeSheet';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <TimeSheet />
      <textarea>
        add a description / title for your event
      </textarea>
      <div>
        <DateTimePicker value={value} />
      </div>
    </>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to cool.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
