import React from 'react';
import { Button } from 'antd'
import InputGroup from '../../../../utils/InputGroup'
import './index.css'

let num = 0;
export default function RegisterFormVerification({nextStepFunc, setVerification, email, resendCallback}) {

    const [waiting, setWaiting] = React.useState(num);
    const [timer, setTimer] = React.useState(null);

    const getValue = (value) => {
        setVerification(value)
    }

    const resend = () => {
        resendCallback();
        setWaiting(60);
        num = 60;
        setTimer(setInterval(() => waitingStep(), 1000))
    }

    const waitingStep = () => {
        num = num - 1;
        setWaiting(num);
    }

    if (waiting === 0){
        clearInterval(timer);
    }

    return (
        <div style={{width:'70%', paddingLeft: '10%', paddingRight: '10%', paddingTop: '40px'}}>
            <div style={{ color: 'gray', marginBottom:'10px', textAlign:'center' }}>Please enter the verification code that we have just sent to {email}</div>
            <InputGroup
                getValue={getValue}
                length={6}
                type={'line'}
                nextStepFunc={nextStepFunc}
            />
            <div className='login-register-verification-resend-button'><Button shape='round' onClick={() => resend()} disabled={waiting === 0?false:true}>{waiting===0?'Resend verification code':`    ${waiting} s    `}</Button></div>
        </div>
    )
}
