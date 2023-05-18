import { error } from 'console';
import { errorMonitor } from 'events';
import React, { useState, useEffect, Component, useRef } from 'react';
import { Interface } from 'readline';
import {format} from 'date-fns';


interface Props {
    className?: string,
    onEnter: (selectedWeekDays: string[]) => void
}


const LoginBox:React.FC<Props> = (props) => {
    const {} = props;
 
    return(
        <div className={props.className}>
     
        </div>
    )
}
export default LoginBox;