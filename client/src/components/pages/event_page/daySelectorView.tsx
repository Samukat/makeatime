import React, { useState, useEffect, Component, useRef } from 'react';
import Time from '../../../helpers/Time';
import { format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays, addMonths, getDate } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import './index.scss'
import Calendar from '../../calendar/index'
import TimeSelector from './timeSelector';



const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const DayHeader: React.FC<{ calenderType: number, weekDays: string[], dates: string[] }> = (dayInfo) => {
    //If we are working with specific dates
    if (dayInfo.calenderType == 0) {
        const dayDates: Date[] = dayInfo.dates.map((day: string) => {
            return new Date(day)
        })

        return (
            <>
                {dayDates.map((day: Date) => (
                    <div className='day-header'>
                        <p className='date'>
                            {format(day, 'dd / MM / yyyy')}
                        </p>
                        <p className='day'>
                            {daysOfWeek[day.getDay()]}
                        </p>
                    </div>
                ))}

            </>
        )
    }

    //If working with days of the week
    if (dayInfo.calenderType == 1) {
        return (
            <>
                {dayInfo.weekDays.map((day: string) => (
                    <div className='day-header'>
                        <p>
                            {daysOfWeek[Number(day)]}
                        </p>
                    </div>
                ))}
            </>
        )
    }

    throw new Error("calenderType is wrong");
}

interface Props {
    calendarType: number,
    weekDays: string[],
    dates: string[],
    startTime: InstanceType<typeof Time>,
    endTime: InstanceType<typeof Time>,
    dataIds: number[],

    className?: string,

    onDayChange: (selectedWeekDays: string[]) => void,

    dayData: Date
}

const DaySelector: React.FC<Props> = (props) => {

    return (
        <div className={props.className}>

            <div className='Times'>
                {(props.calendarType == 0 ? props.dates : props.weekDays).map((day: string) => (
                    <div className='time-selector'>
                        <p>
                            This will be the time selector
                        </p>
                        <TimeSelector startTime={props.startTime} endTime={props.endTime} />
                    </div>
                ))}
            </div>

            <Calendar
                onSelect={() => { }}
                selectType='week'
                className='event'
            />
        </div>
    )
}
export default DaySelector;