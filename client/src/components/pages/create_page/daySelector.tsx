import React, { useState, useEffect, Component } from 'react';
import {Form, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    onSelect: (day: string) => void;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DaySelector: React.FC<Props> = () => { //{ onSelect }
    const [selectedDay, setSelectedDay] = useState<string>("");

    const handleSelectDay = (day: string) => {
        setSelectedDay(day);
        //onSelect(day);
    };

    return (
        <div>
        {daysOfWeek.map((day) => (
            <button
                key={day}
                onClick={() => handleSelectDay(day)}
                style={{
                    backgroundColor: selectedDay === day ? "yellow" : "white"
                }}
                >
                {day}
            </button>
        ))}
        </div>
    );
};

export default DaySelector;