import React, { useState, useEffect } from 'react';
import {Form, Container} from 'react-bootstrap';
import DaySelector from './daySelector';

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { async } from 'q';

export default function Create() {
    const [cal_type, setCal_type] = useState(-1);

    



    return (
        <>
            <div className='event'>
                <h2>Welcome to the makeatime create page</h2>
                <p>This is a paragraph of text ...</p>
            </div>

           
            <Form> {/* onChange={() => console.log(cal_type)} */}
                <Form.Check
                    inline
                    label="Specific Days"
                    name="group1"
                    type='radio'
                    id={`dates-opt1`}
                    onChange={() => setCal_type(0)}
                    
                />
                <Form.Check
                    inline
                    label="Days of the week"
                    name="group1"
                    type='radio'
                    id={`dates-opt2`}
                    onChange={() => setCal_type(1)}
                />

                

            </Form>
            

            <DaySelector input_type={cal_type} onSelect={(selectedDays: string[]) => {
                console.log(selectedDays);
            } } ></DaySelector>
        </>

        
    )
}

