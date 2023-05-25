import React, { useState, useEffect } from 'react';
import './index.scss';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import DaySelector from './daySelectorView';
import Time from '../../../helpers/Time';
import classNames from 'classnames'

export default function Event() {

    const [viewFormat, setViewFormat] = useState('weekly');
    const { id } = useParams();

    const eventdata = useLoaderData();
    var data = JSON.parse(JSON.stringify(eventdata));


    //console.log((data.calendarType==0?data.dates:data.weekDays));
    const startTime = new Time(data.startTime);
    const endTime = new Time(data.endTime);

    return (
        <div className='event'>
            <h1 className='event-title'> Event: {data.eventName}</h1>
            <div className='view-format-selector'>
                <button className={classNames('weekly-selector', `weekly-selector-${(viewFormat === 'weekly') ? 'selected' : 'unselected'}`)} onClick={() => { setViewFormat('weekly') }}>Weekly View</button>
                <button className={classNames('daily-selector', `daily-selector-${(viewFormat === 'daily') ? 'selected' : 'unselected'}`)} onClick={() => { setViewFormat('daily') }}>View All Events</button>
            </div>

            <DaySelector
                calendarType={data.calendarType}
                weekDays={data.weekDays}
                dates={data.dates}
                startTime={startTime}
                endTime={endTime}
                dataIds={data.ids}
                onDayChange={(selectedWeekDays: string[]) => {
                    //null
                    //wip
                }}
                dayData={data.selectedTimes}
                className="DaySelector"
            ></DaySelector>

        </div>
    )
}

export const eventLoader = async ({ params }: LoaderFunctionArgs) => {
    const res = await fetch(`http://localhost:4000/view/${params.id}`).then(data => data.json());
    return res
}