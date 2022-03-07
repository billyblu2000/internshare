import React, { Component } from 'react'
import { Button, Divider, message, Steps } from 'antd'
import { UserOutlined, SolutionOutlined, MailOutlined, FileDoneOutlined } from '@ant-design/icons';
import RegisterFormChooseAccountType from './RegisterFormChooseAccountType'
import RegisterFormEmail from './RegisterFormEmail'
const { Step } = Steps;

export default class RegisterForm extends Component {

    state = {
        step: 0,
        type: '',
        email: '',
    }

    nextStep = () => {
        if (this.state.step === 0){
            if (this.state.type !== 'individual' && this.state.type !== 'company'){
                message.error({content:'Please select your identity', key: 'message'})
                return false;
            }
        }
        else if (this.state.step === 1){
            if (this.state.email === '' || this.state.email === '@nyu.edu'){
                message.error({content:'Please enter your email (NetID)', key:'message'});
                return false;
            }
            if (this.state.email.slice(-8) !== '@nyu.edu' && this.state.type === 'individual'){
                message.error({content:'Sorry, you should use your NYU email', key:'message'});
                return false;
            }
            if (this.state.email.slice(-16) === '@nyu.edu@nyu.edu' && this.state.type === 'individual'){
                this.setState({ step: this.state.step+1,  email: this.state.email.slice(0,-8)});
                return true;
            }
        }
        this.setState({ step: this.state.step+1 })
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Steps style={{ marginTop: '10px', width: '25%', marginLeft: '5%' }} size="small" direction="vertical" current={this.state.step}>
                        <Step title="Identity" icon={<UserOutlined />} />
                        <Step title="Email" icon={<MailOutlined />} />
                        <Step title="Verification" icon={<SolutionOutlined />} />
                        <Step title="Complete Info" icon={<FileDoneOutlined />} />
                    </Steps>
                    <Divider type='vertical' style={{ height: '190px' }}></Divider>
                    {this.state.step === 0 ? <RegisterFormChooseAccountType type={this.state.type} changeType={(type) => this.setState({ type: type })} /> : null}
                    {this.state.step === 1 ? <RegisterFormEmail setEmail={(email) => this.setState({ email: email })} identity={this.state.type}/> : null}
                    {this.state.step === 2 ? <></> : null}
                    {this.state.step === 3 ? <></> : null}
                </div>
                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                <Button type='primary' shape='round' onClick={() => this.nextStep()}>Continue</Button>
                </div>
            </div>
        )
    }
}
