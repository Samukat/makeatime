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

const TimeSelector:React.FC<Props> = (props) => {

    function createButtonArray(startTime:number, endTime:number, time_interval:number){
        const elapsed_time = endTime - startTime;
        
        const elapsed_hours = Math.floor(elapsed_time/100);
        
        const total_btns = elapsed_hours*(Math.floor(60/time_interval)) + (elapsed_time%100)%15;
        

        const buttons: {index:number, timeStart:number}[] = []
        var current_time = startTime;

        for (let i = 0; i < total_btns; i++) {
            buttons.push({
                index: i,
                timeStart: current_time
            })

            current_time += time_interval
            if (current_time%100 >= 60) {
                current_time += 100; //ok this is wrong but ook
                current_time -= Math.floor((current_time%100)/60)*60;
            }
            
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