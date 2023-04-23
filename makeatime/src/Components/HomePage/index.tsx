import './index.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SliderNumber from '../SliderNumber/SliderNumber';
import DisplayNumberNAME from '../DisplayNumber/DisplayNumber';


const Home = () => {
    var output = SliderNumber();
    
    return (
      <>
        {output[0]}
        <DisplayNumberNAME num={Number(output[1])}></DisplayNumberNAME>
        <Outlet />
      </>
    );
  };

export default Home