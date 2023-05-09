import React, { useState, useEffect } from 'react';


// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { useLoaderData } from 'react-router-dom';

export default function Event() {
    const eventdata = useLoaderData()
    var testdata = JSON.stringify({a:1 ,b:2 })

    return (
        <div className='event'>
            <h2>Welcome to the makeatime event page</h2>
            <p>This is a paragraph of text ...</p>
            
            <div>
                {testdata}
            </div>
        </div>
    )
}

export const eventLoader = async () => {
    const res = await fetch('http://localhost:3000/data/').then(data => data.json());

    return res.json()
}