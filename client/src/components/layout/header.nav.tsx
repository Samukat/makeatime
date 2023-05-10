import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const NavigationBar  = () => {
    return (
        <div className="nav-style">
            <Navbar >
                

                <header className='nav-bar'>
                    <Navbar.Brand className='nav-logo' href="\">
                        <img alt="logo" className="logo-image"/>
                            MakeATime
                    </Navbar.Brand>

                    <nav className="nav-links">
                        <NavLink to="/create">Create Events</NavLink>
                        <NavLink to="/event">View Event</NavLink>
                    </nav>
                </header>
            </Navbar>

            <Container className='nav-sub'>
                MakeATime sub 
            </Container>

        </div>
    ) 
}