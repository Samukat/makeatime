import { error } from 'console';
import { errorMonitor } from 'events';
import React, { useState, useEffect, Component, useRef } from 'react';
import { Interface } from 'readline';
import {format} from 'date-fns';


interface Props {
    calenderType: number,
    weekDays: string[],
    dates: string[],
    startTime: number,
    endTime: number,

    className?: string,

    onDayChange: (selectedWeekDays: string[]) => void
}

const daysOfWeek = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DaySelector:React.FC<Props> = (props) => {
    const {calenderType, weekDays, dates} = props;
    const totalDays:number = calenderType==0?dates.length:weekDays.length;  

    const [selectedDays, setSelectedDays] = useState<string[]>([]); 

    
    const DayHeader:React.FC<{calenderType:number, weekDays: string[], dates: string[]}> = (dayInfo) => {
        

        if (calenderType==0) {
            
            const dayDates:Date[] = dayInfo.dates.map((day: string) => {
                return new Date(day)
            })


            return(
                <>
                    {dayDates.map((day:Date)=>(
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
        
        if (calenderType==1) {
            return(
                <>
                    {weekDays.map((day:string)=>(
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
    


    return(
        <div className={props.className}>
            <div className='day-selector' style={{gridTemplateColumns: `repeat(${totalDays}, 1fr)`}}>
                <DayHeader calenderType={calenderType} weekDays={weekDays} dates={dates}/>

                
                {(calenderType==0?dates:weekDays).map((day:string)=>(
                    <div className='time-selector'>
                        <p>
                            This will be the time selector
                        </p>
                        <p>
                            AHH these are times
                        </p>
                    </div>                    
                ))}

            </div>
        </div>
    )
}
export default DaySelector;