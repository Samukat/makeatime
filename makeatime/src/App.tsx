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
    var slider_value = 0;

    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage/>}></Route>
            {/* Routes to different pages here */}
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
