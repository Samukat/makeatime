import React, { useState } from 'react';
import logoImage from '../../../src/Images/logo.png';
import logoImage_hov from '../../../src/Images/logo_hover.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './index.scss';

const NavigationBar = () => {

  return(
  <>
<<<<<<< HEAD
    <nav className="nav">
      <a href='/' className="site-title">
        <div className='logo-padding'>
            <img src={logoImage} alt="logo" className="logo-image" />
        </div>
      </a>
      <div  className='text-image'>
          Make A Time
        </div>
    </nav>
=======
    <div className="nav-style">
      <Navbar className="nav-style-bar" variant="dark"> {/* //bg="dark"  */}
        <Container >
          
          
          <Navbar.Brand href="\">
            <img src={logoImage}  alt="logo" className="logo-image"/>
            MakeATime</Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link href="\create">Create Event</Nav.Link>
            <Nav.Link href="\view">View Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className='nav-sub'>
        MakeATime
      </Container>
    </div>
>>>>>>> peters-branch
  </>
  );
};

export default NavigationBar;


{/* <nav className="nav">
      <a href='/' className="site-title">
        <div className='logo-padding'>
            <img src={logoImage} alt="logo" className="logo-image" />
        </div>
      </a>
    </nav> */}