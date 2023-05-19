import React, { useState, useEffect } from 'react';


// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import DaySelector from './daySelector';

export default function Event() {
    
    const {id} = useParams();

    const eventdata = useLoaderData();
    var data = JSON.parse(JSON.stringify(eventdata));

    


    //console.log((data.calenderType==0?data.dates:data.weekDays));


    

    return (
        <div className='event'>
            <h2>Welcome to the makeatime event page</h2>
            <p>This is a paragraph of text ...</p>
            <h1> Event: {data.eventName}</h1>

            <DaySelector 
                calenderType={data.calenderType}
                weekDays={data.weekDays}
                dates={data.dates}
                startTime={data.startTime} 
                endTime={data.endTime}  
                dataIds={data.ids}
                onDayChange={(selectedWeekDays: string[]) => {
                    //null
                    //wip
                } }           
            ></DaySelector>
            
        </div>
    )
}

export const eventLoader = async ({params}:LoaderFunctionArgs) => {
    
    const res = await fetch(`http://localhost:4000/view/${params.id}`).then(data => data.json());

    
    return res
}