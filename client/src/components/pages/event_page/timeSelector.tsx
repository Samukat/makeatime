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
        const total_btns = elapsed_time.count_intervals(time_interval);
    
        const buttons: {index:number, time:InstanceType<typeof Time>}[] = []

        const current_time = new Time(startTimeOBJ.time_as_int);

        for (let i = 0; i < total_btns; i++) {
            buttons.push({
                index: i,
                time: new Time(current_time.time_as_int, undefined, undefined, time_interval)
            })

            current_time.addMinutes(time_interval)
        }

        console.log(buttons)
        return buttons;
    }

    return(
        <>
            {createButtonArray(props.startTime, props.endTime, time_interval).map((timeSpot) => (
                <button className='time-buttons'>
                    {timeSpot.time.timeString}
                </button>
            ))}
        </>
    )
}

export default TimeSelector;