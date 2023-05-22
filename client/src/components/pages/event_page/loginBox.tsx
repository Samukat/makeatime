import React, { useState, useEffect, Component, useRef } from 'react';


interface Props {
    className?: string,
    onEnter: (selectedWeekDays: string[]) => void
}


const LoginBox: React.FC<Props> = (props) => {
    const { } = props;

    return (
        <div className={props.className}>

        </div>
    )
}
export default LoginBox;