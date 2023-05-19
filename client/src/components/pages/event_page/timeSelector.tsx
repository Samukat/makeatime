import React, { useState, useEffect, Component, useRef } from 'react';
import {format} from 'date-fns';
import convertToTime from "./convertToTime"

interface Props {
    startTime: number,
    endTime: number,
    className?: string,
    onDayChange?: (selectedWeekDays: string[]) => void
}

const time_interval = 15;
const milliseconds_in_hour = 3600000

const TimeSelector:React.FC<Props> = (props) => {
    console.log("poo cunt")
    function createButtonArray(startTimeInt:number, endTimeInt:number, time_interval:number){
        const startTime = convertToTime(startTimeInt)
        const endTime = convertToTime(endTimeInt)

        const elapsed_time = endTime.getTime() - startTime.getTime();
        
        const elapsed_hours = endTime.getHours() - startTime.getHours();
        const elapsed_minutes = endTime.getMinutes() - startTime.getMinutes();
        console.log(endTime.getMinutes())
        console.log(startTime.getMinutes())
        
        const total_btns = Math.floor((elapsed_hours*60+elapsed_minutes)/time_interval + 1)

        const buttons: {index:number, timeStart:string}[] = []
        var current_hours = startTime.getHours()
        var current_minutes = startTime.getMinutes()

        for (let i = 0; i < total_btns; i++) {
            buttons.push({
                index: i,
                timeStart: `${Math.floor(current_hours)}:${current_minutes}${current_minutes == 0 ? '0': ''}`
            })

            current_hours += time_interval/60
            current_minutes = (current_minutes + time_interval) % 60
            
        }

        
        return buttons;
    }

    return(
        <>
            {createButtonArray(props.startTime, props.endTime, time_interval).map((timeSpot) => (
                <button>
                    {timeSpot.timeStart}
                </button>
            ))}
        </>
    )
}

export default TimeSelector;