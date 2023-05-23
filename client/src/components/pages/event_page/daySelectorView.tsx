import React, { useState, useEffect, Component, useRef } from 'react';
import Time from '../../../helpers/Time';
import { format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays, addMonths, getDate } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import './index.scss'
import Calendar from '../../calendar/index'
import { TimeLables, TimeSelector } from './timeSelector';



const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


//returns all the headers of all the days
const DayHeaders: React.FC<{ calenderType: number, weekDays: string[], dates: string[] }> = (dayInfo) => {
    //If we are working with specific dates
    if (dayInfo.calenderType == 0) {
        const dayDates: Date[] = dayInfo.dates.map((day: string) => {
            return new Date(day)
        })

        return (
            <>
                <div className='day-header'>
                    <p>‏</p>
                    {/* HUGE HACK RIGHT THERE */}
                    <p>
                        Times
                    </p>
                </div>

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
                <div className='day-header'>
                    <p>
                        Times
                    </p>
                </div>
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

            <div className='timeSelectors' style={{ gridTemplateColumns: `repeat(${props.dataIds.length + 1}, 120px)` }}>
                <DayHeaders calenderType={props.calendarType} weekDays={props.weekDays} dates={props.dates} />

                <div className='singleSelector timeLabels'>
                    <TimeLables startTime={props.startTime} endTime={props.endTime} onHR={true} />
                </div>

                {(props.calendarType == 0 ? props.dates : props.weekDays).map((day: string) => (
                    <div className='singleSelector'>
                        <TimeSelector startTime={props.startTime} endTime={props.endTime} />
                    </div>
                ))}
            </div>

            <Calendar
                onSelect={() => { }}
                selectType='week'
                className='calendar'
            />
        </div>
    )
}
export default DaySelector;