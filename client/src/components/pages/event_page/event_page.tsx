import React, { useState, useEffect } from 'react';
import './event_page.scss';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import DaySelector from './daySelector';
import Time from '../../../helpers/Time';

export default function Event() {

    const { id } = useParams();

    const eventdata = useLoaderData();
    var data = JSON.parse(JSON.stringify(eventdata));


    //console.log((data.calenderType==0?data.dates:data.weekDays));
    const startTime = new Time(data.startTime);
    const endTime = new Time(data.endTime);

    return (
        <div className='event'>
            <h1 className='event-title'> Event: {data.eventName}</h1>

            <DaySelector
                calenderType={data.calenderType}
                weekDays={data.weekDays}
                dates={data.dates}
                startTime={startTime}
                endTime={endTime}
                dataIds={data.ids}
                onDayChange={(selectedWeekDays: string[]) => {
                    //null
                    //wip
                }}
            ></DaySelector>

        </div>
    )
}

export const eventLoader = async ({ params }: LoaderFunctionArgs) => {
    const res = await fetch(`http://localhost:4000/view/${params.id}`).then(data => data.json());
    return res
}