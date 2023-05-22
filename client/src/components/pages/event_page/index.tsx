import React, { useState, useEffect } from 'react';
import './index.scss';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import DaySelector from './daySelector';
import Time from '../../../helpers/Time';

export default function Event() {

    const { id } = useParams();

    const eventdata = useLoaderData();
    var data = JSON.parse(JSON.stringify(eventdata));


    //console.log((data.calendarType==0?data.dates:data.weekDays));
    const startTime = new Time(data.event.startTime);
    const endTime = new Time(data.event.endTime);

    return (
        <div className='event'>
            <h1 className='event-title'> Event: {data.event.eventName}</h1>

            <DaySelector
                calendarType={data.event.calendarType}
                weekDays={data.event.weekDays}
                dates={data.event.dates}
                startTime={startTime}
                endTime={endTime}
                dataIds={data.event.ids}
                onDayChange={(selectedWeekDays: string[]) => {
                    //null
                    //wip
                }}
                dayData={data.days}
            ></DaySelector>

        </div>
    )
}

export const eventLoader = async ({ params }: LoaderFunctionArgs) => {
    const res = await fetch(`http://localhost:4000/view/${params.id}`).then(data => data.json());
    return res
}