import React, { useState, useEffect } from 'react';


// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';

export default function Event() {
    
    const {id} = useParams();

    const eventdata = useLoaderData();
    var data = JSON.parse(JSON.stringify(eventdata));

    


    //console.log((data.calenderType==0?data.dates:data.weekDays));


    

    return (
        <div className='event'>
            <h2>Welcome to the makeatime event page</h2>
            <p>This is a paragraph of text ...</p>
            
            <div>
                <h1> Event: {data.eventName}</h1>
                {(data.calenderType==0?data.dates:data.weekDays).map((day:string)=>(
                    
                    <p className='key'>
                        <span>Day/Date: </span>
                        <span>{day}</span>
                    </p>
                ))}

                {/* {Object.keys(data.dates).map((key: any, i) => (
                    <p className='key'>
                        <span>Key Name: {key}</span>
                        <span>Value: {JSON.stringify(data[key])}</span>
                    </p>
                ))} */}
            </div>
        </div>
    )
}

export const eventLoader = async ({params}:LoaderFunctionArgs) => {
    
    const res = await fetch(`http://localhost:4000/view/${params.id}`).then(data => data.json());

    return res
}