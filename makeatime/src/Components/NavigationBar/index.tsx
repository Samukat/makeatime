import React, { useState, useEffect } from 'react';
import logoImage from '../../../src/Images/logo.png';
import logoImage_hov from '../../../src/Images/logo_hover.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, NavLink, useLocation} from 'react-router-dom';

import './index.scss';

const NavigationBar = () => {
  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    const storedActiveLink = localStorage.getItem('activeLink');
    if (storedActiveLink) {
      setActiveLink(parseInt(storedActiveLink));
    }
  }, []);

  const handleLinkClick = (index: number) => {
    setActiveLink(index);
    localStorage.setItem('activeLink', index.toString());
  }
  
  return(
  <>
    <div className="nav-style">
      <Navbar className="nav-style-bar" variant="dark"> {/* //bg="dark"  */}
        <Container>
          <Navbar.Brand href="\" className='nav-logo'>
            <img src={logoImage}  alt="logo" className="logo-image"/>
            Make A Time
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="create"><p className={activeLink === 1 ? 'nav-link-selected' : 'nav-links'} onClick={() => handleLinkClick(1)}>Create Event</p></Nav.Link>

            <Nav.Link href="view"><p className={activeLink === 2 ? 'nav-link-selected' : 'nav-links'} onClick={() => handleLinkClick(2)}>View Event</p></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
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