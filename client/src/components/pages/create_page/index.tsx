import React, { useState, useEffect } from 'react';
import {Form, Container} from 'react-bootstrap';
import DaySelector from './daySelector';

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { async } from 'q';

export default function Create() {
    const [cal_type, setCal_type] = useState(0);

    



    return (
        <>
            <div className='event'>
                <h2>Welcome to the makeatime create page</h2>
                <p>This is a paragraph of text ...</p>
            </div>


        <Form>
            <Form.Check
                    inline
                    label="Specific Days"
                    name="group1"
                    type='radio'
                    id={`dates-opt1`}
                />
                <Form.Check
                    inline
                    label="Days of the week"
                    name="group1"
                    type='radio'
                    id={`dates-opt2`}
                />
            </Form>

            <DaySelector onSelect={function (day: string): void {
                console.log(day);
            } }></DaySelector>
        </>

        
    )
}

