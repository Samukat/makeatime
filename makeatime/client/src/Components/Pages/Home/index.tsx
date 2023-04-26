import './index.scss';
import { useEffect, useState, useContext } from 'react';
import React from 'react';

type GreetProps = {
  isLoggedIn: boolean
}

const Home = (props: GreetProps) => {
    return (
      <>
        <div className='page'>
          <div>
            {props.isLoggedIn
            ? 'Select your availability'
            : 'Welcome to Make A Time, create an event to get started'
            }
          </div>
        </div>
      </>
    );
  };

export default Home