import React, { useState, useEffect, Component } from 'react';
import {Form, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    onSelect: (selectedDays: string[]) => void,
    className?: string
    input_type: number //if 0 then calender, if 1 then weekdays
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DaySelector:React.FC<Props> = (props) => { //on sellect is a prop function
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleSelectDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays => selectedDays.filter(item => item !== day))
        } else {
            setSelectedDays(selectedDays => [...selectedDays,day]);
        }
    };

    useEffect(() => {
        props.onSelect(selectedDays)
      
    }, [selectedDays])



    useEffect(() => {
        console.log(props.input_type)
        //might need to add some array cleaning in here if switching between types
    }, [props.input_type])


    
    
    if (props.input_type === 1) {
        return (
        
            <div className={props.className}>
                {daysOfWeek.map((day) => (
                    <button
                        key={day}
                        onClick={() => handleSelectDay(day)}
                        className={"day_selector_button " + ((selectedDays.includes(day)) ? "selected": null )} 
                        >
                        {day}
                    </button>
                ))}
            </div> 
        );
    } else {
        return(
            <div>
                calender WIP
            </div>
        )
    }
    
};

export default DaySelector;