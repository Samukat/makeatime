import React, { useState, useEffect, Component, useRef } from 'react';
import {Form, Container, Button, ToggleButton} from 'react-bootstrap';
<<<<<<< HEAD
import {format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual} from 'date-fns';
import './style.scss';
=======
import {format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays} from 'date-fns';

>>>>>>> 81d315747e3c7112580598ff6ee34933499e0205
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import { Value } from 'sass';

interface Props {
    onSelect: (selectedWeekDays: string[]) => void,
    className?: string
    input_type: number //if 0 then calender, if 1 then weekdays
}

//const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDateRange(){
    //const days:string[] = [];

    let today = startOfToday();

    //creating the days array from start to end interval
    const days:Date[] = eachDayOfInterval({ 
        start:startOfWeek(startOfMonth(today)), 
        end:endOfWeek(endOfMonth(today)) //also so its start and end of week
    })

    return days;
}

const DaySelector:React.FC<Props> = (props) => { //on sellect is a prop function
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [selectedDateDays, setSelectedDateDays] = useState<Date[]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

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

    useEffect(() => {
        console.log(props.input_type)
        //might need to add some array cleaning in here if switching between types
    }, [props.input_type])

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
        
            <div className={props.className}>
                {daysOfWeek.map((day) => (
                    <div className='day_selector_div'>
                        {/* <p>{day}</p> */}
                        <button
                            key={day}
                            onClick={() => handleSelectDay(day)}
                            className={"day_selector_button " + ((selectedWeekDays.includes(day)) ? "selected": null )} 
                        >
                            {day}
                        </button>
                    </div>
                ))}
            </div> 
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
                        <p>{monthNames[startOfToday().getMonth()]}</p>
                        <button className='btnleft'> {"<"} </button>
                        <button className='btnright'> {">"} </button>
                    </div>
                    <div className="calender-days" onMouseDown={() => setIsMouseDown(true)} onMouseLeave={() => setIsMouseDown(false)} >
                        <p className='dayTitles'>S</p>
                        <p className='dayTitles'>M</p>
                        <p className='dayTitles'>T</p>
                        <p className='dayTitles'>W</p>
                        <p className='dayTitles'>T</p>
                        <p className='dayTitles'>F</p>
                        <p className='dayTitles'>S</p>

<<<<<<< HEAD
                        {getDateRange().map((date, dateIdx) => (
                            <div
                            key={date.toString()}
                            className={classNames(
                                "day",
                                isToday(date) && "today",
                                !isSameMonth(date, startOfToday()) && "diffMonth",
                                selectedDateDays.some((value: Date) => isEqual(date, value)) &&
                                "selected"
                            )}
                            >
                            <button
                                onMouseEnter={() => { if (isMouseDown){handleSelectDay(date)}}}
                                onMouseDown={() => handleSelectDay(date)}
                                type="button"
                            >
                                <time dateTime={format(date, "yyyy-MM-dd")}>{format(date, "d")}</time>
=======
                    {getDateRange().map((date, dateIdx) => (
                        <div key={date.toString()} className={classNames(
                            'day', 
                            isToday(date) && 'today',
                            !isSameMonth(date, startOfToday()) && 'diffMonth',  
                            selectedDateDays.some((value:Date) => {return isEqual(date, value)}) && 'selected',
                            selectedDateDays.some((value:Date) => {return isEqual(addDays(date,1), value)}) && selectedDateDays.some((value:Date) => {return isEqual(date, value)}) && 'onRight',
                            selectedDateDays.some((value:Date) => {return isEqual(addDays(date,-1), value)}) && selectedDateDays.some((value:Date) => {return isEqual(date, value)}) && 'onLeft'
                        )}> 
                            <button 
                                onClick={() => handleSelectDay(date)}
                                type='button'>
                                <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date,'d')}</time>
>>>>>>> 81d315747e3c7112580598ff6ee34933499e0205
                            </button>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <></>
        )
    }
    


};

export default DaySelector;