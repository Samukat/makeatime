import React from 'react';
import Time from '../../../helpers/Time';

interface Props {
    startTime: InstanceType<typeof Time>,
    endTime: InstanceType<typeof Time>,
    className?: string,
    onDayChange?: (selectedWeekDays: string[]) => void
}

const time_interval = 15;

function createButtonArray(startTimeOBJ: InstanceType<typeof Time>, endTimeOBJ: InstanceType<typeof Time>, time_interval: number) {
    console.log(startTimeOBJ, endTimeOBJ)

    const elapsed_time = startTimeOBJ.interval(endTimeOBJ)
    const total_btns = elapsed_time.count_intervals(time_interval) + 1;

    // console.log(elapsed_time, startTimeOBJ, endTimeOBJ);
    const buttons: { index: number, time: InstanceType<typeof Time> }[] = []

    const current_time = new Time(startTimeOBJ.time_as_int);

    for (let i = 0; i < total_btns; i++) {
        buttons.push({
            index: i,
            time: new Time(current_time.time_as_int, undefined, undefined, time_interval)
        })

        current_time.addMinutes(time_interval)
    }


    return buttons;
}

const TimeSelector: React.FC<Props> = (props) => {
    return (
        <>
            {createButtonArray(props.startTime, props.endTime, time_interval).map((timeSpot) => (
                <button className='time-buttons'>
                    {/* {timeSpot.time.timeString} */}
                </button>
            ))}
        </>
    )
}

interface LabelProps extends Props {
    onHR: boolean
    every?: number
}

const TimeLables: React.FC<LabelProps> = (props) => {
    let values = createButtonArray(props.startTime, props.endTime, time_interval);


    function getEveryNth(arr: { index: number, time: InstanceType<typeof Time> }[], nth: number) {
        const nthValues: { index: number, time: InstanceType<typeof Time> }[] = []

        for (let index = 0; index < arr.length; index += nth) {
            nthValues.push(arr[index]);
        }

        return nthValues;
    }

    if (props.onHR) {
        values = values.filter((value) => (
            value.time.getExtraMinutes == 0
        ))
    } else {
        if (props.every) {
            values = getEveryNth(values, props.every);
        }
    }


    return (
        <>
            {values.map((timeSpot) => (
                <p className='time-labels'>
                    {timeSpot.time.timeString}
                </p>
            ))}
        </>
    )
}

export { TimeSelector, TimeLables };