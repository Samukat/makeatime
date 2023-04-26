import './index.scss';
import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SliderNumber from '../SliderNumber/SliderNumber';
import DisplayNumberNAME from '../DisplayNumber/DisplayNumber';
import { numberContext } from '../SliderNumber/SliderNumber';
import LoginBox from "../LoginBox/index";

type GreetProps = {
  isLoggedIn: boolean
}

const Home = (props: GreetProps) => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    useEffect(() => {
      //add ad event listener
      window.addEventListener('resize', handleResize)
      //remove the event lister when this is no longer running 
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const numberValue = useContext(numberContext)
    return (
      <>
        <div className='page'>
          <div>
            {props.isLoggedIn
            ? 'Select your availability'
            : 'Welcome to Make A Time, create an event to get started'
            }
          </div>
          <SliderNumber />
          <DisplayNumberNAME num={numberValue}></DisplayNumberNAME>
          <p>{width}</p>
          <Outlet />
          <LoginBox />
        </div>
      </>
    );
  };

export default Home