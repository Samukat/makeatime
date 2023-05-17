import React, { useState, useEffect, useRef } from 'react';
import {Form, Container, Button, SplitButton} from 'react-bootstrap';
import DaySelector from './daySelector';
import Select from 'react-select';

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { async } from 'q';

let default_start = 715;
let default_end = 2115;

export default function Create() {
    const [cal_type, setCal_type] = useState(-1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const eventNameRef = useRef<HTMLInputElement>(null);

    //time things
    const [start_time, setStartTime] = useState(default_start);
    const [end_time, setEndTime] = useState(default_end);


    //create
    const handleCreate = () => {

        let name = eventNameRef.current?.value
        console.log(name)
        if (name?.length == 0) {
            window.alert("Please input a event name");
            return;
        }
        if (selectedDays.length == 0) {
            window.alert("Please select some dates");
            return;
        }
        if (cal_type == -1) {
            return;
        }

        const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const Data = {
            eventName: name, 
            dates: cal_type==0?selectedDays:selectedDays.map((day)=>{return daysOfWeek.indexOf(day)}), 
            calenderType: cal_type, 
            startTime: start_time,
            endTime: end_time
        };
        
        fetch('http://localhost:4000/create', { //change IP
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error creating event');
            }
        })
        .then(data => {
            console.log('Event created:', data);
        })
        .catch(error => {
            console.error('Error creating event:', error);
        });
    }



    function timeOptions(start_time:number, end_time:number = 2400){
        const times: { value: string; label: string; }[] = [];
        for (let hour = Math.floor(start_time/100); hour < Math.floor(end_time/100); hour++) {
            for (let min = (hour==Math.floor(start_time/100)?start_time%100:0); min < 60; min+=15) {
                times.push({value: (hour*100+min).toString(), label: `${hour==0||hour==12?"12":hour%12}:${min<10?"0":""}${min} ${hour<12?"am":"pm"}`})
            }
        }

        
        return times;
    }
    
    return (
        <>
            <div className='event' >
                <h2>Create an Event</h2>
            </div>
            <div className='banner'/>
           <div className='event-form'>
                <Form.Control className='name-box'
                    placeholder="Event Name"
                    ref={eventNameRef}
                    aria-label="Event-name"
                    aria-describedby="The name of your event should go here"
                />

                <div className='input-boxes'>
                    <div className='inner-box leftbox'>
                        <h3>Day Calender</h3>
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
                    
                    <div className='inner-box right-box'>
                        <h3>Time picker</h3>
                        
                        <p>Start Time
                            <Select options={timeOptions(0)} defaultValue={timeOptions(0).filter((time)=>{return Number(time.value) == default_start})} onChange={(e) => {
                                setStartTime(Number(e?.value));
                                if (start_time > end_time) {
                                    setEndTime(start_time)
                                }
                            }}/>
                        </p>

                        <p>End Time
                            <Select 
                                options={timeOptions(start_time+15)} //may have issues
                                defaultValue={timeOptions(start_time).filter((time)=>{return Number(time.value) == default_end})} 
                                value={timeOptions(start_time).filter((time)=>{return Number(time.value)==end_time})} 
                                onChange={(e) => { setEndTime(Number(e?.value));}
                            }/>
                        </p>
                        {/* <SplitButton text="Paste" items={{12,13,14}}/> */}
                    </div>
                </div>
                <div className='bottom-buttons' >
                    <Button className='submit-btn' variant={selectedDays.length > 0? "outline-success": "outline-warning"} onClick={handleCreate}>Create!</Button>{' '}
                    <Button className='clear-button' variant='outline-warning'>Clear</Button>
                </div>
            </div>  
            {(selectedDays.length > 0) && selectedDays.map((day) => (
                <p>
                    {day}
                </p>
            ))}
        </>
    )
}