import { react } from '@babel/types';
import { json } from 'body-parser';
import { response } from 'express';
import React, {useState, useEffect, useContext, createContext} from 'react';
import Slider from 'react-slider';
import { number } from 'yargs';


export const numberContext = createContext(0)

//the componant as a function (as opposed to class that extends componants)
export default function SliderNumber() {
    const [slider_val, setslider_val] = useState(0);
    const [items, setitems] = useState("");

    function update_number(parsed_val:string) {
        console.log(parsed_val);
        if (!isNaN(parseInt(parsed_val))) {
            setslider_val(previousState => {
                console.log("the number that it is is => " + parsed_val);
                return previousState + Number(parsed_val);
            });
            
        } else {
            setslider_val(0);
        }
        console.log("The current passed:"  + slider_val);
    }

    useEffect(() => {
        console.log("This will run whenever slider_val changes");
        //could output some json in here! im gonna make it fetch from an api
        fetch('http://numbersapi.com/'+slider_val.toString())
            .then(response => {
                console.log(response)
                return response.text()
            })
            .then(json => {
                console.log(json);
                setitems(json);
            }).catch(e => console.log(e));
        console.log("Set items is : " + setitems.toString());

    }, [slider_val])


    return (
        <>
            <numberContext.Provider value={slider_val}>
                <h1> Slider this slider 3 </h1>
                <textarea name="numArea" defaultValue="input number" onChange={e => update_number(e.target.value)}></textarea>
                <p>{items}</p>
                {/* {items.map(item => {
                    return <pre>{JSON.stringify(item)}</pre>
                })} */}
            </numberContext.Provider>
        </>
    )
}

