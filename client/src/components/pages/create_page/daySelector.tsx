import React, { useState, useEffect, Component } from 'react';
import {Form, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    onSelect: (selectedDays: string[]) => void,
    input_type: number //if 0 then calender, if 1 then weekdays
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DaySelector:React.FC<Props> = ({ onSelect, input_type }) => { //on sellect is a prop function
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleSelectDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays => selectedDays.filter(item => item !== day))
        } else {
            setSelectedDays(selectedDays => [...selectedDays,day]);
        }
    };

    useEffect(() => {
        onSelect(selectedDays)
      
    }, [selectedDays])



    useEffect(() => {
        console.log(input_type)
        //might need to add some array cleaning in here if switching between types
    }, [input_type])


    
    
    if (input_type === 1) {
        return (
        
            <div>
                {daysOfWeek.map((day) => (
                    <button
                        key={day}
                        onClick={() => handleSelectDay(day)}
                        className={"day_selector_button " + ((selectedDays.includes(day)) ? "selected": null )} 
                        >
                        {day}
                    </button>
                ))}
    
                {/* {selectedDays.map((day) => (
                    <p>
                        {day}
                    </p>
                ))} */}
            </div> 
        );
    } else {
        return(
            <div>

            </div>
        )
    }
    
};

export default DaySelector;