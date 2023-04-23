import React, { useState } from 'react';
import logoImage from '../../../src/Images/logo.png';
import logoImage_hov from '../../../src/Images/logo_hover.png';


import './index.scss';

const NavigationBar = () => {

  return(
  <>
    <nav className="nav">
      <a href='/' className="site-title">
        <div className='logo-padding'>
            <img src={logoImage} alt="logo" className="logo-image" />
        </div>
      </a>
    </nav>
  </>
  );
};

export default NavigationBar;
