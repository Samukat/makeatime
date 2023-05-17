import React, { useState, useEffect, Component, useRef } from 'react';
import {Form, Container, Button, ToggleButton} from 'react-bootstrap';
import './style.scss';
import {format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays, addMonths} from 'date-fns';

import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import { Value } from 'sass';

interface Props {
    onSelect: (selectedWeekDays: string[]) => void,
    className?: string
    input_type: number //if 0 then calender, if 1 then weekdays
}

//const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateRange(dayInMonth:Date){
    //creating the days array from start to end interval
    const days:Date[] = eachDayOfInterval({ 
        start:startOfWeek(startOfMonth(dayInMonth)), 
        end:endOfWeek(endOfMonth(dayInMonth)) //also so its start and end of week
    })

    return days;
}

const DaySelector:React.FC<Props> = (props) => { //on sellect is a prop function

    //selected lists
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [selectedDateDays, setSelectedDateDays] = useState<Date[]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    //calender date stuff
    let today = startOfToday();
    const [currentMonth, setCurrentMonth] = useState(today);
    const [crossFade, setCrossFade] = useState(0); 

    //clearing
    const handleClear = () => {
        if (props.input_type == 1) {
            setSelectedWeekDays([])
        } else if (props.input_type == 0) {
            setSelectedDateDays([])
        }
    }


    //return when changed
    useEffect(() => {
        props.onSelect(selectedWeekDays)
      
    }, [selectedWeekDays])
    useEffect(() => {
        const dateString:string[] = []
        selectedDateDays.forEach((day:Date) => {
            dateString.push(day.toString())
        })
        props.onSelect(dateString)
    }, [selectedDateDays])


    //drag select
    useEffect(() => {
        const handleMouseUp = () => {
            setIsMouseDown(false);
        };
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    if (props.input_type === 1) {
        const handleSelectDay = (day: string) => {
            if (selectedWeekDays.includes(day)) {
                setSelectedWeekDays(selectedWeekDays => selectedWeekDays.filter(item => item !== day)) //delets reselected day
            } else {
                setSelectedWeekDays(selectedWeekDays => [...selectedWeekDays,day]);
            }
        };

        return (
            <>
                <div className = 'calendar-section'>
                    <div className={props.className} onMouseDown={() => setIsMouseDown(true)} onMouseLeave={() => setIsMouseDown(false)}>
                        {daysOfWeek.map((day) => (
                            <div className='day_selector_div'>
                                <button
                                    key={day}
                                    onMouseEnter={() => { if (isMouseDown){handleSelectDay(day)}}}
                                    onMouseDown={() => handleSelectDay(day)}
                                    className={"day_selector_button " + ((selectedWeekDays.includes(day)) ? "selected": null )} 
                                >
                                    {day}
                                </button>
                            </div>
                        ))}
                    </div> 
                    
                </div>
            </>
        );
    } 
    else if (props.input_type === 0) {
        

        const handleSelectDay = (day: Date) => {
            if (selectedDateDays.some((value: Date) => isEqual(day, value))) {
                setSelectedDateDays(selectedDateDays =>
                    selectedDateDays.filter(item => !isEqual(day, item))
                ); //deletes reselected day
            }   else {
                setSelectedDateDays(selectedDateDays => [...selectedDateDays, day]);
            }
        };

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
        return(
            <>
                <div className = 'calendar-section'>
                    <div className='calender-cont'>
                        <p>{monthNames[currentMonth.getMonth()]}</p>
                        <p>{currentMonth.getFullYear()}</p>
                        <button className='btnleft' onClick={()=>{
                            setCurrentMonth(addMonths(currentMonth,-1))
                            setCrossFade(-1)
                        }}> {"<"} </button>
                        <button className='btnright' onClick={()=>{
                            setCurrentMonth(addMonths(currentMonth,1))
                            setCrossFade(1)
                        }}> {">"} </button>
                    </div>
                    <div className={classNames("calender-days", crossFade === 1 && "crossFadeLeft", crossFade === -1 && "crossFadeRight") } onMouseDown={() => setIsMouseDown(true)} onMouseLeave={() => setIsMouseDown(false)} onAnimationEnd={() => setCrossFade(0)}>
                        <p className='dayTitles'>S</p>
                        <p className='dayTitles'>M</p>
                        <p className='dayTitles'>T</p>
                        <p className='dayTitles'>W</p>
                        <p className='dayTitles'>T</p>
                        <p className='dayTitles'>F</p>
                        <p className='dayTitles'>S</p>

                    {getDateRange(currentMonth).map((date, dateIdx) => (
                        <div key={date.toString()} className={classNames(
                            'day', 
                            isToday(date) && 'today',
                            !isSameMonth(date, currentMonth) && 'diffMonth',  
                            selectedDateDays.some((value:Date) => {return isEqual(date, value)}) && 'selected',
                            selectedDateDays.some((value:Date) => {return isEqual(addDays(date,1), value)}) && selectedDateDays.some((value:Date) => {return isEqual(date, value)}) && 'onRight',
                            selectedDateDays.some((value:Date) => {return isEqual(addDays(date,-1), value)}) && selectedDateDays.some((value:Date) => {return isEqual(date, value)}) && 'onLeft'
                        )}> 
                            <button 
                                onMouseEnter={() => { if (isMouseDown){handleSelectDay(date)}}}
                                onMouseDown={() => handleSelectDay(date)}
                                type='button'>
                                <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date,'d')}</time>
                            </button>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <p>
                Please select some days! 
                The options are specific days by selecting from the calender, 
                or, weekdays that you can use for weekly repeating events.
            </p>
        )
    }
    


};

export default DaySelector;