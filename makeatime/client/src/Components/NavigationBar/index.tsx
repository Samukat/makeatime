import React, { useState, useEffect } from 'react';
import logoImage from '../../Images/logo.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
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
          <Navbar.Brand href="\" className='nav-logo' onClick={() => handleLinkClick(0)}>
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

