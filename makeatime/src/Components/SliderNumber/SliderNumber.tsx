import React from 'react';
import Slider from 'react-slider';
import { number } from 'yargs';

//the componant as a function (as opposed to class that extends componants)
function SliderNumber() {
    let slider_val:number = 0;
    return ([
        <>
            <h1> Slider this slider 3 </h1>
            <textarea name="numArea" defaultValue="input number" onChange={e => {
                var value = e.target.value;
            
                slider_val = parseInt(value);
            }}></textarea>
        </>
        ,slider_val
    ])
}


export default SliderNumber