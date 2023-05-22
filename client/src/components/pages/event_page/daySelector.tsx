import React, { useState, useEffect, Component, useRef } from 'react';
import Time from '../../../helpers/Time';
import { format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays, addMonths, getDate } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import './index.scss'
import Calendar from '../../calendar/index'


interface Props {
    calendarType: number,
    weekDays: string[],
    dates: string[],
    startTime: InstanceType<typeof Time>,
    endTime: InstanceType<typeof Time>,
    dataIds: number[],

    className?: string,

    onDayChange: (selectedWeekDays: string[]) => void,

    dayData: Date //bro really!
}



const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function getDateRange(dayInMonth: Date) {
    //creating the days array from start to end interval
    const days: Date[] = eachDayOfInterval({
        start: startOfWeek(startOfMonth(dayInMonth)),
        end: endOfWeek(endOfMonth(dayInMonth)) //also so its start and end of week
    })

    return days;
}

function getWeekRange(dayInWeek: Date) {
    const days: Date[] = eachDayOfInterval({
        start: startOfWeek(dayInWeek),
        end: endOfWeek(dayInWeek)
    })
    return days;
}



const DaySelector: React.FC<Props> = (props) => {

    return (
        <>
            <Calendar
                onSelect={() => { }}
                selectType='week'
                className='event'
            />
        </>
    )
}
export default DaySelector;