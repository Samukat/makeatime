import React, { useState, useEffect } from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import DaySelector from './daySelector';

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { async } from 'q';

export default function Create() {
    const [cal_type, setCal_type] = useState(-1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    



    return (
        <>
            <div className='event'>
                <h2>Welcome to the makeatime create page</h2>
                <p>This is a paragraph of text ...</p>
            </div>

           <div className='event-form'>
                <Form.Control className='name-box'
                    placeholder="Event Name"
                    aria-label="Event-name"
                    aria-describedby="The name of your event should go here"
                />

                <div className='input-boxes'>
                    <div className='input-boxes leftbox'>
                        
                        <Form> 
                            

                            <div className='radio-boxes'>
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
                            </div>
                        </Form>
                        

                        <DaySelector 
                            input_type={cal_type} 
                            onSelect={(days: string[]) => {
                                setSelectedDays(selectedDays => days);
                            } }
                            className='selector'
                        ></DaySelector>
                    </div>
                    
                    <div className='right-box'>
                    <p>
                        
                    </p>
                </div>
                </div>
                
                
                
                <Button className='submit-btn' variant={selectedDays.length > 0? "outline-success": "outline-warning"} >Create!</Button>{' '}

            </div>  

            {(selectedDays.length > 0) && selectedDays.map((day) => (
                <p>
                    {day}
                </p>
            ))}
        </>

        
    )
}

