import React, { useState, useEffect } from 'react';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from '../../calendar/index'

interface Props {
    onSelect: (selectedWeekDays: string[]) => void,
    className?: string
    input_type: number //if 0 then calendar, if 1 then weekdays
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const DaySelector: React.FC<Props> = (props) => { //on sellect is a prop function
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedDateDays, setSelectedDateDays] = useState<string[]>([]);

    //return when changed
    useEffect(() => {
        props.onSelect(selectedWeekDays)

    }, [selectedWeekDays])


    useEffect(() => {
        const dateString: string[] = []
        selectedDateDays.forEach((day: string) => {
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
                setSelectedWeekDays(selectedWeekDays => [...selectedWeekDays, day]);
            }
        };

        return (
            <>
                <div className='calendar-section'>
                    <div className={props.className} onMouseDown={() => setIsMouseDown(true)} onMouseLeave={() => setIsMouseDown(false)}>
                        {daysOfWeek.map((day) => (
                            <div className='day_selector_div'>
                                <button
                                    key={day}
                                    onMouseEnter={() => { if (isMouseDown) { handleSelectDay(day) } }}
                                    onMouseDown={() => handleSelectDay(day)}
                                    className={"day_selector_button " + ((selectedWeekDays.includes(day)) ? "selected" : null)}
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

        return (
            <>
                <Calendar
                    onSelect={(days: string[]) => { setSelectedDateDays(selectedDateDays => days); }}
                    selectType='day'
                    className='create'
                />
            </>
        )
    } else {
        return (
            <p>
                Please select some days!
                The options are specific days by selecting from the calendar,
                or, weekdays that you can use for weekly repeating events.
            </p>
        )
    }



};

export default DaySelector;