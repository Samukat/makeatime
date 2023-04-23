import './index.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SliderNumber from '../SliderNumber/SliderNumber';
import DisplayNumberNAME from '../DisplayNumber/DisplayNumber';


const Home = () => {
    return (
      <>
        <SliderNumber></SliderNumber>
        <DisplayNumberNAME num={23}></DisplayNumberNAME>
        <Outlet />
      </>
    );
  };

export default Home