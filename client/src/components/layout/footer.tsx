import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap'
import {NavLink} from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import './style.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container className='footer-bar'>
                <div className='footer-component'>
                    © makeatime 2023
                </div>
                <NavLink className='footer-link' to="./about">
                    About
                </NavLink>
                <div className='footer-component last-comp'>
                    2023
                </div>
                
            </Container>
        </footer>
    ) 
}