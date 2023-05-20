import React, { useState, useEffect, Component, useRef } from 'react';
import {format} from 'date-fns';
import Time from '../../../helpers/Time';

interface Props {
    startTime: InstanceType<typeof Time>,
    endTime: InstanceType<typeof Time>,
    className?: string,
    onDayChange?: (selectedWeekDays: string[]) => void
}

const time_interval = 15;

const TimeSelector:React.FC<Props> = (props) => {
    function createButtonArray(startTimeOBJ:InstanceType<typeof Time>, endTimeOBJ:InstanceType<typeof Time>, time_interval:number){
        const elapsed_time = startTimeOBJ.interval(endTimeOBJ)
        
        // const elapsed_hours = endTime.getHours() - startTime.getHours();
        // const elapsed_minutes = endTime.getMinutes() - startTime.getMinutes();
        // console.log(endTime.getMinutes())
        // console.log(startTime.getMinutes())

        console.log(elapsed_time.time_as_int)
        
        const total_btns = Math.floor((elapsed_time.getHours*60+elapsed_time.getMinutes)/time_interval + 1)

        const buttons: {index:number, timeStart:string}[] = []
        var current_hours = startTimeOBJ.getHours
        var current_minutes = startTimeOBJ.getMinutes

        for (let i = 0; i < total_btns; i++) {
            buttons.push({
                index: i,
                timeStart: `${Math.floor(current_hours)}:${current_minutes}${current_minutes == 0 ? '0': ''}`
            })

            current_hours += time_interval/60
            current_minutes = (current_minutes + time_interval) % 60
            
        }

        console.log(buttons)
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