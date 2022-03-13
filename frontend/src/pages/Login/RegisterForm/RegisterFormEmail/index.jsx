import React from 'react';
import { AutoComplete } from 'antd';

export default function RegisterFormEmail({ setEmail, identity, nextStepFunc }) {

    const [focus, setFocus] = React.useState(false)

    const onKeyDownchange = (e) => {
        if (e.which === 13) {
            nextStepFunc()
        }
    }

    return (
        <div style={{ width: '70%', paddingLeft: '10%', paddingRight: '10%', paddingTop: '30px' }}>
            {identity === 'individual' ? <div className='login-label' id='login-register-email-label'>Enter your NYU email (NetID)</div> : <div></div>}
            <div className={focus ? 'login-input-focus' : 'login-input'}>
                <div style={{ display: 'flex' }}>
                    <AutoComplete
                        bordered={false}
                        allowClear
                        onBlur={() => setFocus(false)}
                        onFocus={() => setFocus(true)}
                        onChange={(value) => setEmail(value + '@nyu.edu')}
                        onKeyPress={onKeyDownchange}
                        style={{ padding: '0px', width: '100%', textAlign: 'center' }}
                    >
                    </AutoComplete>
                    <div style={{marginTop:'5px'}}>@nyu.edu</div>
                </div>
            </div>
        </div>
    )
}
