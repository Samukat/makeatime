import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap'

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
                <div className='footer-component'>
                    sdfgsakdjhfgkasjhdfg akjhsdgkajhsdf info 1
                </div>
                <div className='footer-component last-comp'>
                    2023
                </div>
            </Container>
        </footer>
    ) 
}