import React, { useState, useEffect } from 'react';
import './index.scss';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import DaySelector from './daySelectorView';
import Time from '../../../helpers/Time';

export default function Event() {

    const { id } = useParams();

    const eventdata = useLoaderData();
    var data = JSON.parse(JSON.stringify(eventdata));


    //console.log((data.calendarType==0?data.dates:data.weekDays));
    const startTime = new Time(data.startTime);
    const endTime = new Time(data.endTime);

    return (
        <div className='event'>
            <h1 className='event-title'> Event: {data.eventName}</h1>

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