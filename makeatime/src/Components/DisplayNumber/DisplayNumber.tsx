import * as React from 'react'


//what prop contains 
interface Props {
    num: number
}

//the componant as a function (as opposed to class that extends componants)
function DisplayNumber(props: Props) {
    console.log(props.num.toString())
    return (
        <>
            <h1> Slider this the display number comp. </h1>
            <h2> the current number is {props.num.toString()} </h2>
        </>
    )
}

//
export default DisplayNumber