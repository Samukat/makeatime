import React from 'react';
import Slider from 'react-slider';

//the componant as a function (as opposed to class that extends componants)
function SliderNumber() {
    return (
        <>
            <h1> Slider this slider 3 </h1>
            <Slider className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track" />
        </>
    )
}


export default SliderNumber