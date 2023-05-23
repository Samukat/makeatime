import './index.scss'
import React, { useState, useEffect, ForwardedRef, useImperativeHandle } from 'react';
import { format, eachDayOfInterval, endOfMonth, startOfMonth, startOfToday, endOfWeek, startOfWeek, isToday, isSameMonth, isEqual, addDays, addMonths } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

interface Props {
    onSelect: (selectedWeekDays: string[]) => void,
    selectType: string,
    className?: string
}

function getMonthRange(dayInMonth: Date) {
    //creating the days array from start to end interval
    const days: Date[] = eachDayOfInterval({
        start: startOfWeek(startOfMonth(dayInMonth)),
        end: endOfWeek(endOfMonth(dayInMonth)) //also so its start and end of week
    })
    return days;
}

function getWeekRange(dayInMonth: Date) {
    //creating the days array from start to end interval
    const days: Date[] = eachDayOfInterval({
        start: startOfWeek(dayInMonth),
        end: endOfWeek(dayInMonth) //also so its start and end of week
    })
    return days;
}

const Calendar = (props: Props, ref: ForwardedRef<any>) => {
    useImperativeHandle(
        ref,
        () => {
            return { clear: () => setSelectedDateDays([]) }
        }
    );


    let today = startOfToday();

    const [selectedDateDays, setSelectedDateDays] = useState<Date[]>([]);
    const [currentMonth, setCurrentMonth] = useState(today);
    const [crossFade, setCrossFade] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsMouseDown(false);
        };
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        const dateString: string[] = []
        selectedDateDays.forEach((day: Date) => {
            dateString.push(day.toString())
        })
        props.onSelect(dateString)
    }, [selectedDateDays])




    function clearCal() {
        setSelectedDateDays([]);
    }

    const handleSelectDay = (day: Date) => {
        if (props.selectType === 'day') {
            if (selectedDateDays.some((value: Date) => isEqual(day, value))) {
                setSelectedDateDays(selectedDateDays =>
                    selectedDateDays.filter(item => !isEqual(day, item))
                ); //deletes reselected day
            } else {
                setSelectedDateDays(selectedDateDays => [...selectedDateDays, day]);
            }
        } else if (props.selectType === 'week') {
            const week = getWeekRange(day)
            for (let i = 0; i < 7; i++) {
                if (selectedDateDays.some((value: Date) => isEqual(week[i], value))) {
                    setSelectedDateDays(selectedDateDays =>
                        selectedDateDays.filter(item => !isEqual(week[i], item))
                    ); //deletes reselected day
                } else {
                    setSelectedDateDays(selectedDateDays => [...selectedDateDays, week[i]]);
                }
            }
            console.log(selectedDateDays)
        }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return (
        <>
            <div className={`${props.className}-calendar-section`}>
                <div className={`${props.className}-calendar-cont`}>
                    <div className='month-year'>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
                    <button className='btnleft' onClick={() => {
                        setCurrentMonth(addMonths(currentMonth, -1))
                        setCrossFade(-1)
                    }}> {"<"} </button>
                    <button className='btnright' onClick={() => {
                        setCurrentMonth(addMonths(currentMonth, 1))
                        setCrossFade(1)
                    }}> {">"} </button>
                </div>
                <div className={classNames(`${props.className}-calendar-days`, crossFade === 1 && "crossFadeLeft", crossFade === -1 && "crossFadeRight")} onMouseDown={() => setIsMouseDown(true)} onMouseLeave={() => setIsMouseDown(false)} onAnimationEnd={() => setCrossFade(0)}>
                    <p className='dayTitles'>S</p>
                    <p className='dayTitles'>M</p>
                    <p className='dayTitles'>T</p>
                    <p className='dayTitles'>W</p>
                    <p className='dayTitles'>T</p>
                    <p className='dayTitles'>F</p>
                    <p className='dayTitles'>S</p>

                    {getMonthRange(currentMonth).map((date, dateIdx) => (
                        <div key={date.toString()} className={classNames(
                            'day',
                            isToday(date) && 'today',
                            !isSameMonth(date, currentMonth) && 'diffMonth',
                            selectedDateDays.some((value: Date) => { return isEqual(date, value) }) && 'selected',
                            selectedDateDays.some((value: Date) => { return isEqual(addDays(date, 1), value) }) && selectedDateDays.some((value: Date) => { return isEqual(date, value) }) && 'onRight',
                            selectedDateDays.some((value: Date) => { return isEqual(addDays(date, -1), value) }) && selectedDateDays.some((value: Date) => { return isEqual(date, value) }) && 'onLeft'
                        )}>
                            <button
                                onMouseEnter={() => { if (isMouseDown) { handleSelectDay(date) } }}
                                onMouseDown={() => handleSelectDay(date)}
                                type='button'>
                                <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'd')}</time>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default React.forwardRef(Calendar);
