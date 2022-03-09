import React from 'react';
import { Button } from 'antd'
import InputGroup from '../../../../utils/InputGroup'
import './index.css'

export default function RegisterFormVerification({nextStepFunc, setVerification, email}) {


    const getValue = (value) => {
        setVerification(value)
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
            <div className='login-register-verification-resend-button'><Button shape='round'>Resend verification code</Button></div>
        </div>
    )
}
