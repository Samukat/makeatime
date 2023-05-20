import React, { useState, useEffect, Component, useRef } from 'react';
import TimeSelector from './timeSelector';
import Time from '../../../helpers/Time';
import { format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays, addMonths, getDate } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import './event_page.scss'


interface Props {
    calenderType: number,
    weekDays: string[],
    dates: string[],
    startTime: InstanceType<typeof Time>,
    endTime: InstanceType<typeof Time>,
    dataIds: number[],

    className?: string,

    onDayChange: (selectedWeekDays: string[]) => void,

    dayData: any //bro really!
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
    const [selectedDays, setSelectedDays] = useState<Date[]>([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    let today = startOfToday()
    const [currentMonth, setCurrentMonth] = useState(today);

    const [crossFade, setCrossFade] = useState(0);
    const [mouseOver, setMouseOver] = useState<Date[]>([])
    
    useEffect(() => {
        const handleMouseUp = () => {
            setIsMouseDown(false);
        };
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const { dataIds, calenderType, weekDays, dates, startTime, endTime } = props;

    //error handeling for data
    if (dataIds === undefined) {
        return (<h1>Broken Event</h1>)
    }
    
    const totalDays: number = dataIds.length

    const WeeklyCalendar = () => {
        return (
            <>
                <div className='weekly-calendar-container'>
                    <p className='day-titles'>Sunday</p>
                    <p className='day-titles'>Monday</p>
                    <p className='day-titles'>Tuesday</p>
                    <p className='day-titles'>Wednesday</p>
                    <p className='day-titles'>Thursday</p>
                    <p className='day-titles'>Friday</p>
                    <p className='day-titles'>Saturday</p>
                </div>
            </>
        )
    }

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

    // MAKE THIS A COMponent rather then just copy past....
    if (calenderType == 0) {
        const handleSelectDay = (day: Date) => {
            if (selectedDays.some((value: Date) => isEqual(day, value))) {
                const week = getWeekRange(day)
                for (let i = 0; i < 7; i++) {
                    setSelectedDays(selectedDays =>
                        selectedDays.filter(item => !isEqual(week[i], item))
                    ); //deletes reselected day
                }
            } else {
                const week = getWeekRange(day)
                for (let i = 0; i < 7; i++) {
                    setSelectedDays(selectedDays => [...selectedDays, week[i]]);
                }
            }
        };

        const handleMouseOver = (day: Date) => {
            const week = getWeekRange(day);
            setMouseOver([])
            for (let i = 0; i < 7; i++) {
                setMouseOver(mouseOver => [...mouseOver, week[i]])
            }
        }
        const handleMouseLeave = () => {
            setMouseOver([])
        }


        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return (
            <>
                <div className={props.className}>
                <div className='day-selector' style={{gridTemplateColumns: `repeat(${totalDays}, 1fr)`}}>
                    <DayHeader calenderType={calenderType} weekDays={weekDays} dates={dates}/>

                    
                    {(calenderType==0?dates:weekDays).map((day:string)=>(
                        <div className='time-selector'>
                            <p>
                                This will be the time selector
                            </p>
                            <TimeSelector startTime={startTime} endTime={endTime}/>
                        </div>                    
                    ))}

                </div>
                </div>
            
                <WeeklyCalendar />
                <div className='calendar-section'>
                    <div className='month-calendar-cont'>
                        <p className='month-header'> {monthNames[currentMonth.getMonth()]}</p>
                        <p>{currentMonth.getFullYear()}</p>
                        <button className='btnleft' onClick={() => {
                            setCurrentMonth(addMonths(currentMonth, -1))
                            setCrossFade(-1)
                        }}> {"<"} </button>
                        <button className='btnright' onClick={() => {
                            setCurrentMonth(addMonths(currentMonth, 1))
                            setCrossFade(1)
                        }}> {">"} </button>
                    </div>
                    <div className={classNames("calender-days", crossFade === 1 && "crossFadeLeft", crossFade === -1 && "crossFadeRight")} onMouseDown={() => setIsMouseDown(true)} onMouseLeave={() => setIsMouseDown(false)} onAnimationEnd={() => setCrossFade(0)}>
                        <p className='dayTitles'>S</p>
                        <p className='dayTitles'>M</p>
                        <p className='dayTitles'>T</p>
                        <p className='dayTitles'>W</p>
                        <p className='dayTitles'>T</p>
                        <p className='dayTitles'>F</p>
                        <p className='dayTitles'>S</p>

                        {getDateRange(currentMonth).map((date, dateIdx) => (
                            <div key={date.toString()} className={classNames(
                                'day',
                                isToday(date) && 'today',
                                !isSameMonth(date, currentMonth) && 'diffMonth',
                                selectedDays.some((value: Date) => { return isEqual(date, value) }) && 'selected',
                                selectedDays.some((value: Date) => { return isEqual(addDays(date, 1), value) }) && selectedDays.some((value: Date) => { return isEqual(date, value) }) && 'onRight',
                                selectedDays.some((value: Date) => { return isEqual(addDays(date, -1), value) }) && selectedDays.some((value: Date) => { return isEqual(date, value) }) && 'onLeft'
                            )}
                                onMouseLeave={() => handleMouseLeave()}
                            >
                                <button
                                    onMouseEnter={() => { if (isMouseDown) { handleSelectDay(date) } }}
                                    onMouseDown={() => handleSelectDay(date)}
                                    onMouseOver={() => handleMouseOver(date)}
                                    type='button'
                                    className={(mouseOver.some(dates => dates.toDateString() === date.toDateString())) ? 'button-on-hover' : ''}
                                >
                                    <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'd')}</time>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }



    ///WHYYY IS THIS HERER!!!!! WHAT IS THIS IS
    else if (calenderType == 1) {
        return (
            <>
            </>
        )
    }
    else {
        return (<>404 Error</>)
    }
}
export default DaySelector;