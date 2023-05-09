import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';

export const Navbar = () => {
    return (
        <header>
            <nav className="me-auto">
                <NavLink to="\create">Create Event</NavLink>
                <NavLink to="\view">View Event</NavLink>
            </nav>
            <div className="nav-style">
                <h1> Makeatime</h1>
            </div>
        </header>
    ) 
}