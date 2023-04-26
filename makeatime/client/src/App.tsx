import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout/index';
import Home from './Components/Pages/Home/index';
import Create from './Components/Pages/Create/index';
import View from './Components/Pages/View/index';

class App extends Component {

  render(): React.ReactNode {
    var slider_value = 0;

    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home isLoggedIn={false}/>} />
            <Route path="/create" element={<Create/>}></Route>
            <Route path="/view" element={<View/>}></Route>
            {/* Routes to different pages here */}
          </Route>
        </Routes>
      </>
    );
  }
}

export default App;
